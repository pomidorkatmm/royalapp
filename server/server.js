import express from 'express'
import compression from 'compression'
import path from 'path'
import { fileURLToPath } from 'url'
import { createProxyMiddleware } from 'http-proxy-middleware'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(compression())

// ---- WB API proxy (обходит CORS) ----
app.use(
  '/wb',
  createProxyMiddleware({
    target: 'https://feedbacks-api.wildberries.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb': '',
    },
    onProxyReq: (proxyReq, req) => {
      // ВАЖНО: ключ не хранится на сервере; он приходит от браузера как Authorization header.
      // Никаких логов с ключом!
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Feedbacks API proxy (альтернативный домен feedbacks-api.wb.ru) ----
app.use(
  '/wb2',
  createProxyMiddleware({
    target: 'https://feedbacks-api.wb.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb2': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Ads API proxy (advert-api.wildberries.ru) ----
app.use(
  '/wb-ads',
  createProxyMiddleware({
    target: 'https://advert-api.wildberries.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-ads': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Ads API proxy (альтернативный домен advert-api.wb.ru) ----
app.use(
  '/wb-ads2',
  createProxyMiddleware({
    target: 'https://advert-api.wb.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-ads2': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Media Ads API proxy (advert-media-api.wildberries.ru) ----
app.use(
  '/wb-ads-media',
  createProxyMiddleware({
    target: 'https://advert-media-api.wildberries.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-ads-media': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Media Ads API proxy (альтернативный домен advert-media-api.wb.ru) ----
app.use(
  '/wb-ads-media2',
  createProxyMiddleware({
    target: 'https://advert-media-api.wb.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-ads-media2': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Common API proxy (common-api.wildberries.ru) ----
app.use(
  '/wb-common',
  createProxyMiddleware({
    target: 'https://common-api.wildberries.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-common': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Common API proxy (альтернативный домен common-api.wb.ru) ----
app.use(
  '/wb-common2',
  createProxyMiddleware({
    target: 'https://common-api.wb.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-common2': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Content API proxy (content-api.wildberries.ru) ----
app.use(
  '/wb-content',
  createProxyMiddleware({
    target: 'https://content-api.wildberries.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-content': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Content API proxy (альтернативный домен content-api.wb.ru) ----
app.use(
  '/wb-content2',
  createProxyMiddleware({
    target: 'https://content-api.wb.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-content2': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Prices & Discounts API proxy (discounts-prices-api.wildberries.ru) ----
app.use(
  '/wb-prices',
  createProxyMiddleware({
    target: 'https://discounts-prices-api.wildberries.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-prices': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Prices & Discounts API proxy (альтернативный домен discounts-prices-api.wb.ru) ----
app.use(
  '/wb-prices2',
  createProxyMiddleware({
    target: 'https://discounts-prices-api.wb.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-prices2': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Marketplace API proxy ----
app.use(
  '/wb-marketplace',
  createProxyMiddleware({
    target: 'https://marketplace-api.wildberries.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-marketplace': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Marketplace API proxy (альтернативный домен marketplace-api.wb.ru) ----
app.use(
  '/wb-marketplace2',
  createProxyMiddleware({
    target: 'https://marketplace-api.wb.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-marketplace2': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Statistics API proxy ----
app.use(
  '/wb-statistics',
  createProxyMiddleware({
    target: 'https://statistics-api.wildberries.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-statistics': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Statistics API proxy (альтернативный домен statistics-api.wb.ru) ----
app.use(
  '/wb-statistics2',
  createProxyMiddleware({
    target: 'https://statistics-api.wb.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-statistics2': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Finance API proxy ----
app.use(
  '/wb-finance',
  createProxyMiddleware({
    target: 'https://finance-api.wildberries.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-finance': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Finance API proxy (альтернативный домен finance-api.wb.ru) ----
app.use(
  '/wb-finance2',
  createProxyMiddleware({
    target: 'https://finance-api.wb.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-finance2': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Analytics API proxy ----
app.use(
  '/wb-analytics',
  createProxyMiddleware({
    target: 'https://analytics-api.wildberries.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-analytics': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Analytics API proxy (альтернативный домен analytics-api.wb.ru) ----
app.use(
  '/wb-analytics2',
  createProxyMiddleware({
    target: 'https://analytics-api.wb.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-analytics2': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Promotion API proxy ----
app.use(
  '/wb-promotion',
  createProxyMiddleware({
    target: 'https://promotion-api.wildberries.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-promotion': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Promotion API proxy (альтернативный домен promotion-api.wb.ru) ----
app.use(
  '/wb-promotion2',
  createProxyMiddleware({
    target: 'https://promotion-api.wb.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-promotion2': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Chat API proxy ----
app.use(
  '/wb-chat',
  createProxyMiddleware({
    target: 'https://chat-api.wildberries.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-chat': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Chat API proxy (альтернативный домен chat-api.wb.ru) ----
app.use(
  '/wb-chat2',
  createProxyMiddleware({
    target: 'https://chat-api.wb.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-chat2': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Supplies API proxy ----
app.use(
  '/wb-supplies',
  createProxyMiddleware({
    target: 'https://supplies-api.wildberries.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-supplies': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Supplies API proxy (альтернативный домен supplies-api.wb.ru) ----
app.use(
  '/wb-supplies2',
  createProxyMiddleware({
    target: 'https://supplies-api.wb.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-supplies2': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Returns API proxy ----
app.use(
  '/wb-returns',
  createProxyMiddleware({
    target: 'https://returns-api.wildberries.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-returns': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Returns API proxy (альтернативный домен returns-api.wb.ru) ----
app.use(
  '/wb-returns2',
  createProxyMiddleware({
    target: 'https://returns-api.wb.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-returns2': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Documents API proxy ----
app.use(
  '/wb-documents',
  createProxyMiddleware({
    target: 'https://documents-api.wildberries.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-documents': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- WB Documents API proxy (альтернативный домен documents-api.wb.ru) ----
app.use(
  '/wb-documents2',
  createProxyMiddleware({
    target: 'https://documents-api.wb.ru',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/wb-documents2': '',
    },
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader('origin')
    },
  }),
)

// ---- Static фронтенд (после `npm run build`) ----
const distDir = path.resolve(__dirname, '..', 'dist')
app.use(express.static(distDir))

// SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

const port = Number(process.env.PORT || 4173)
app.listen(port, () => {
  console.log(`WB feedbacks app running on http://localhost:${port}`)
  console.log('API proxy: /wb -> https://feedbacks-api.wildberries.ru')
  console.log('API proxy: /wb2 -> https://feedbacks-api.wb.ru')
  console.log('API proxy: /wb-ads -> https://advert-api.wildberries.ru')
  console.log('API proxy: /wb-ads2 -> https://advert-api.wb.ru')
  console.log('API proxy: /wb-ads-media -> https://advert-media-api.wildberries.ru')
  console.log('API proxy: /wb-ads-media2 -> https://advert-media-api.wb.ru')
  console.log('API proxy: /wb-common -> https://common-api.wildberries.ru')
  console.log('API proxy: /wb-common2 -> https://common-api.wb.ru')
  console.log('API proxy: /wb-content -> https://content-api.wildberries.ru')
  console.log('API proxy: /wb-content2 -> https://content-api.wb.ru')
  console.log('API proxy: /wb-prices -> https://discounts-prices-api.wildberries.ru')
  console.log('API proxy: /wb-prices2 -> https://discounts-prices-api.wb.ru')
  console.log('API proxy: /wb-marketplace -> https://marketplace-api.wildberries.ru')
  console.log('API proxy: /wb-marketplace2 -> https://marketplace-api.wb.ru')
  console.log('API proxy: /wb-statistics -> https://statistics-api.wildberries.ru')
  console.log('API proxy: /wb-statistics2 -> https://statistics-api.wb.ru')
  console.log('API proxy: /wb-finance -> https://finance-api.wildberries.ru')
  console.log('API proxy: /wb-finance2 -> https://finance-api.wb.ru')
  console.log('API proxy: /wb-analytics -> https://analytics-api.wildberries.ru')
  console.log('API proxy: /wb-analytics2 -> https://analytics-api.wb.ru')
  console.log('API proxy: /wb-promotion -> https://promotion-api.wildberries.ru')
  console.log('API proxy: /wb-promotion2 -> https://promotion-api.wb.ru')
  console.log('API proxy: /wb-chat -> https://chat-api.wildberries.ru')
  console.log('API proxy: /wb-chat2 -> https://chat-api.wb.ru')
  console.log('API proxy: /wb-supplies -> https://supplies-api.wildberries.ru')
  console.log('API proxy: /wb-supplies2 -> https://supplies-api.wb.ru')
  console.log('API proxy: /wb-returns -> https://returns-api.wildberries.ru')
  console.log('API proxy: /wb-returns2 -> https://returns-api.wb.ru')
  console.log('API proxy: /wb-documents -> https://documents-api.wildberries.ru')
  console.log('API proxy: /wb-documents2 -> https://documents-api.wb.ru')
})
