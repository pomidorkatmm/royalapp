import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ВАЖНО: В продакшене (после `npm run build`) прокси из Vite не работает.
// Для запуска собранной версии используйте `npm run start` — там есть локальный Express‑прокси.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Все запросы к WB API идут через /wb чтобы избежать CORS в браузере.
      '/wb': {
        target: 'https://feedbacks-api.wildberries.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb/, ''),
      },
      '/wb2': {
        target: 'https://feedbacks-api.wb.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb2/, ''),
      },

      '/wb-ads': {
        target: 'https://advert-api.wildberries.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-ads/, ''),
      },
      '/wb-ads2': {
        target: 'https://advert-api.wb.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-ads2/, ''),
      },
      '/wb-ads-media': {
        target: 'https://advert-media-api.wildberries.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-ads-media/, ''),
      },
      '/wb-ads-media2': {
        target: 'https://advert-media-api.wb.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-ads-media2/, ''),
      },
      '/wb-common': {
        target: 'https://common-api.wildberries.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-common/, ''),
      },

      '/wb-common2': {
        target: 'https://common-api.wb.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-common2/, ''),
      },
      '/wb-content': {
        target: 'https://content-api.wildberries.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-content/, ''),
      },

      '/wb-content2': {
        target: 'https://content-api.wb.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-content2/, ''),
      },
      '/wb-prices': {
        target: 'https://discounts-prices-api.wildberries.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-prices/, ''),
      },

      '/wb-prices2': {
        target: 'https://discounts-prices-api.wb.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-prices2/, ''),
      },
      '/wb-marketplace': {
        target: 'https://marketplace-api.wildberries.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-marketplace/, ''),
      },
      '/wb-marketplace2': {
        target: 'https://marketplace-api.wb.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-marketplace2/, ''),
      },
      '/wb-statistics': {
        target: 'https://statistics-api.wildberries.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-statistics/, ''),
      },
      '/wb-statistics2': {
        target: 'https://statistics-api.wb.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-statistics2/, ''),
      },
      '/wb-finance': {
        target: 'https://finance-api.wildberries.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-finance/, ''),
      },
      '/wb-finance2': {
        target: 'https://finance-api.wb.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-finance2/, ''),
      },
      '/wb-analytics': {
        target: 'https://analytics-api.wildberries.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-analytics/, ''),
      },
      '/wb-analytics2': {
        target: 'https://analytics-api.wb.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-analytics2/, ''),
      },
      '/wb-promotion': {
        target: 'https://promotion-api.wildberries.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-promotion/, ''),
      },
      '/wb-promotion2': {
        target: 'https://promotion-api.wb.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-promotion2/, ''),
      },
      '/wb-chat': {
        target: 'https://chat-api.wildberries.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-chat/, ''),
      },
      '/wb-chat2': {
        target: 'https://chat-api.wb.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-chat2/, ''),
      },
      '/wb-supplies': {
        target: 'https://supplies-api.wildberries.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-supplies/, ''),
      },
      '/wb-supplies2': {
        target: 'https://supplies-api.wb.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-supplies2/, ''),
      },
      '/wb-returns': {
        target: 'https://returns-api.wildberries.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-returns/, ''),
      },
      '/wb-returns2': {
        target: 'https://returns-api.wb.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-returns2/, ''),
      },
      '/wb-documents': {
        target: 'https://documents-api.wildberries.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-documents/, ''),
      },
      '/wb-documents2': {
        target: 'https://documents-api.wb.ru',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wb-documents2/, ''),
      },
    },
  },
})
