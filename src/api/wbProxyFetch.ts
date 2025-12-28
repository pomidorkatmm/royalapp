import { WbHttpError } from './wbClient'

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function buildUrl(
  base: string,
  path: string,
  query?: Record<string, string | number | boolean | undefined | null>,
) {
  const u = new URL(base + path, window.location.origin)
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null || v === '') continue
      u.searchParams.set(k, String(v))
    }
  }
  return u.toString()
}

async function parseMaybeJson(res: Response): Promise<any> {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

/**
 * Унифицированный запрос к прокси WB (Ads / Content / Prices).
 * Ретраи:
 * - 429: повтор с задержкой из X-Ratelimit-Retry (секунды)
 * - 5xx: экспоненциальный backoff
 */
export async function wbProxyFetch<T>(
  token: string,
  base: string,
  path: string,
  opts: {
    method?: string
    query?: Record<string, string | number | boolean | undefined | null>
    body?: any
    formData?: FormData
    headers?: Record<string, string>
    maxRetries?: number
    /**
     * Как формировать заголовок Authorization.
     * - raw: передавать токен как есть (как в feedbacks-api)
     * - bearer: передавать "Bearer <token>"
     * - auto: сначала raw, а при типичных ошибках (401/404) пробовать bearer
     */
    authMode?: 'raw' | 'bearer' | 'auto'
  } = {},
): Promise<T> {
  const { method = 'GET', query, body, formData, headers = {}, maxRetries = 4, authMode = 'raw' } = opts
  const url = buildUrl(base, path, query)

  const cleanToken = token.trim()
  const authRaw = cleanToken
  const authBearer = cleanToken.toLowerCase().startsWith('bearer ') ? cleanToken : `Bearer ${cleanToken}`

  // Важно: некоторые методы Promotion в реальности встречаются как с raw-токеном,
  // так и с Bearer-префиксом. Поэтому для Ads используем fallback.
  const authCandidates: string[] =
    authMode === 'bearer' ? [authBearer] : authMode === 'auto' ? [authRaw, authBearer] : [authRaw]

  let attempt = 0
  // Перебор форматов Authorization (обычно 1, для auto максимум 2)
  for (const authHeaderValue of authCandidates) {
    attempt = 0
    while (true) {
      attempt += 1

      const reqHeaders: Record<string, string> = {
        Authorization: authHeaderValue,
        ...headers,
      }

    // Если formData, Content-Type выставит браузер сам
    if (body !== undefined && !formData) {
      reqHeaders['Content-Type'] = 'application/json'
    }

    let res: Response
    try {
      res = await fetch(url, {
        method,
        headers: reqHeaders,
        body: formData ? formData : body === undefined ? undefined : JSON.stringify(body),
      })
    } catch (e: any) {
      if (attempt <= maxRetries) {
        await sleep(Math.min(2000 * attempt, 8000))
        continue
      }
      throw new WbHttpError(0, 'Сетевая ошибка', String(e?.message ?? e))
    }

    if (res.status === 204) {
      return null as T
    }

    if (res.status === 429) {
      const retryAfterSec = Number(res.headers.get('X-Ratelimit-Retry') ?? '2')
      const waitMs = Math.max(500, (Number.isFinite(retryAfterSec) ? retryAfterSec : 2) * 1000)
      if (attempt <= maxRetries) {
        await sleep(waitMs)
        continue
      }
    }

    if (res.status === 409) {
      if (attempt <= maxRetries) {
        await sleep(Math.min(800 * attempt, 6000))
        continue
      }
    }

    if (res.status >= 500 && res.status <= 599) {
      if (attempt <= maxRetries) {
        await sleep(Math.min(600 * 2 ** (attempt - 1), 8000))
        continue
      }
    }

      if (!res.ok) {
        const payload = await parseMaybeJson(res)
        const detail = payload?.detail || payload?.errorText || payload?.message

        // Если включён auto-режим, то при 401/404 попробуем другой формат Authorization.
        // 404 с "Please consult ... api-information" в документации WB прямо означает неверный URL,
        // но в практике Ads API такой 404 иногда проявляется и при некорректном формате заголовка.
        const maybeTryNextAuth =
          authMode === 'auto' &&
          (res.status === 401 ||
            (res.status === 404 && String(detail ?? '').includes('openapi/api-information')))

        if (maybeTryNextAuth) {
          // выходим из retry-цикла и пробуем следующий authHeaderValue
          break
        }

        throw new WbHttpError(res.status, res.statusText || 'Ошибка WB API', detail)
      }

      const payload = (await parseMaybeJson(res)) as T
      return payload
    }
  }

  // Если дошли сюда — перебрали authCandidates и ничего не вернулось
  throw new WbHttpError(401, 'Unauthorized', 'Не удалось авторизоваться в WB Ads API (проверьте токен Promotion)')
}
