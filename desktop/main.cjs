const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');

let httpServer;

function startLocalServer(port = 4173) {
  const express = require('express');
  const compression = require('compression');
  const { createProxyMiddleware } = require('http-proxy-middleware');

  const srv = express();
  srv.use(compression());

  // ---- WB API proxy (обходит CORS) ----
  srv.use(
    '/wb',
    createProxyMiddleware({
      target: 'https://feedbacks-api.wildberries.ru',
      changeOrigin: true,
      secure: true,
      pathRewrite: { '^/wb': '' },
      onProxyReq: (proxyReq) => {
        proxyReq.removeHeader('origin');
      },
    }),
  );

  // ---- WB Ads API proxy (Promotion) ----
  srv.use(
    '/wb-ads',
    createProxyMiddleware({
      target: 'https://advert-api.wildberries.ru',
      changeOrigin: true,
      secure: true,
      pathRewrite: { '^/wb-ads': '' },
      onProxyReq: (proxyReq) => {
        proxyReq.removeHeader('origin');
      },
    }),
  );

  // ---- WB Media Ads API proxy (advert-media-api) ----
  srv.use(
    '/wb-ads-media',
    createProxyMiddleware({
      target: 'https://advert-media-api.wildberries.ru',
      changeOrigin: true,
      secure: true,
      pathRewrite: { '^/wb-ads-media': '' },
      onProxyReq: (proxyReq) => {
        proxyReq.removeHeader('origin');
      },
    }),
  );

  // ---- WB Common API proxy (general) ----
  srv.use(
    '/wb-common',
    createProxyMiddleware({
      target: 'https://common-api.wildberries.ru',
      changeOrigin: true,
      secure: true,
      pathRewrite: { '^/wb-common': '' },
      onProxyReq: (proxyReq) => {
        proxyReq.removeHeader('origin');
      },
    }),
  );

  // ---- WB Content API proxy ----
  srv.use(
    '/wb-content',
    createProxyMiddleware({
      target: 'https://content-api.wildberries.ru',
      changeOrigin: true,
      secure: true,
      pathRewrite: { '^/wb-content': '' },
      onProxyReq: (proxyReq) => {
        proxyReq.removeHeader('origin');
      },
    }),
  );

  // ---- WB Prices/Discounts API proxy ----
  srv.use(
    '/wb-prices',
    createProxyMiddleware({
      target: 'https://discounts-prices-api.wildberries.ru',
      changeOrigin: true,
      secure: true,
      pathRewrite: { '^/wb-prices': '' },
      onProxyReq: (proxyReq) => {
        proxyReq.removeHeader('origin');
      },
    }),
  );

  // ---- Static фронтенд ----
  const distDir = path.resolve(__dirname, '..', 'dist');
  srv.use(express.static(distDir));

  // SPA fallback
  srv.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });

  return new Promise((resolve, reject) => {
    try {
      const s = srv.listen(port, () => resolve({ server: s, port }));
      s.on('error', reject);
    } catch (e) {
      reject(e);
    }
  });
}

function createWindow(url) {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // Нам не нужен nodeIntegration; приложение работает как обычный веб.
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL(url);
}

async function bootstrap() {
  // В режиме разработки: если запущен Vite на 5173 — открываем его.
  // В собранной версии: поднимаем локальный сервер и открываем его.
  const isDev = !app.isPackaged;

  if (isDev) {
    createWindow('http://localhost:5173');
    return;
  }

  const distIndex = path.resolve(__dirname, '..', 'dist', 'index.html');
  const fs = require('fs');
  if (!fs.existsSync(distIndex)) {
    dialog.showErrorBox(
      'Не найден фронтенд',
      'Папка dist не найдена. Похоже, приложение собрано некорректно.\n\nПопробуйте пересобрать: npm run desktop:build',
    );
    app.quit();
    return;
  }

  try {
    const { server, port } = await startLocalServer(4173);
    httpServer = server;
    createWindow(`http://localhost:${port}`);
  } catch (e) {
    dialog.showErrorBox('Ошибка запуска', String(e?.message || e));
    app.quit();
  }
}

app.whenReady().then(bootstrap);

app.on('window-all-closed', () => {
  // На Windows закрываем приложение.
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  try {
    if (httpServer) httpServer.close();
  } catch {
    // ignore
  }
});
