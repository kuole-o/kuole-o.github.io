const workboxVersion = '6.5.4';

importScripts(`https://storage.googleapis.com/workbox-cdn/releases/${workboxVersion}/workbox-sw.js`);

workbox.core.setCacheNameDetails({
  prefix: "Guo Le's Blog"
});

self.skipWaiting();
workbox.core.clientsClaim();

// 注册成功后要立即缓存的资源列表
// 具体缓存列表在gulpfile.js中配置，见下文
workbox.precaching.precacheAndRoute([{"revision":"890e6414c6667383ff6a2ae8aebc9468","url":"./404.html"},{"revision":"02db2f639cd97479e51b275170ba1606","url":"./index.html"},{"revision":"b3eb80f3f869f42f35676cad77acce1a","url":"./js/main.js"}], {
  directoryIndex: null
});

// 清空过期缓存
workbox.precaching.cleanupOutdatedCaches();

// workbox.strategies.CacheFirst 缓存优先
// workbox.strategies.NetworkFirst 网络优先
// workbox.strategies.NetworkOnly：仅使用正常的网络请求
// workbox.strategies.CacheOnly：仅使用缓存中的资源
// workbox.strategies.StaleWhileRevalidate：从缓存中读取资源的同时发送网络请求更新本地缓存

// 图片资源（可选，不需要就注释掉）
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 60 * 60 * 24 * 30 // 30day
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
);

// Keep frequently edited site assets fresh; vendor libraries can use a longer cache.
const customAssetPaths = new Set([
  '/js/carousel_motion.js',
  '/js/blog_init.js',
  '/js/blog_utils.js',
  '/js/bbtalk.js',
  '/js/universe.js',
  '/js/random_color.js',
  '/css/color.css',
  '/css/blog.css',
  '/css/blog_max_1200.css',
  '/css/blog_max_768.css',
  '/css/bbtalk.css'
]);
const isCustomAsset = url => url.origin === self.location.origin && customAssetPaths.has(url.pathname);

// 缓存第三方 js / css 资源
workbox.routing.registerRoute(
  ({ url }) => /\.(?:css|js)$/i.test(url.pathname) && !isCustomAsset(url),
  new workbox.strategies.CacheFirst({
    cacheName: "static-libs",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 60 * 60 * 24 * 30 //30day
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
);

workbox.routing.registerRoute(
  ({ url }) => isCustomAsset(url),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "custom-assets-cache",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 60 * 60 * 24 * 7 //7day
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
);

// 字体文件（可选，不需要就注释掉）
workbox.routing.registerRoute(
  /\.(?:eot|ttf|woff|woff2)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "fonts",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 60 * 60 * 24 * 30
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
);

// 谷歌字体（可选，不需要就注释掉）
// workbox.routing.registerRoute(
//     /^https:\/\/fonts\.googleapis\.com/,
//     new workbox.strategies.StaleWhileRevalidate({
//         cacheName: "google-fonts-stylesheets"
//     })
// );
// workbox.routing.registerRoute(
//     /^https:\/\/fonts\.gstatic\.com/,
//     new workbox.strategies.CacheFirst({
//         cacheName: 'google-fonts-webfonts',
//         plugins: [
//             new workbox.expiration.ExpirationPlugin({
//                 maxEntries: 1000,
//                 maxAgeSeconds: 60 * 60 * 24 * 30
//             }),
//             new workbox.cacheableResponse.CacheableResponsePlugin({
//                 statuses: [0, 200]
//             })
//         ]
//     })
// );

workbox.routing.registerRoute(
  ({ url }) => {
    return (
      (url.href.match(/^https?:\/\/cdn\.guole\.fun/) ||
        url.href.match(/^https?:\/\/jsd\.guole\.fun/) ||
        url.href.match(/^https?:\/\/cdnjs\.guole\.fun/) ||
        url.href.match(/^https?:\/\/umami\.guole\.fun\/script\.js/) ||
        url.href.match(/^https?:\/\/umami\.guole\.fun\/images\//) ||
        url.href.match(/^https?:\/\/twikoo-magic\.oss-cn-hangzhou\.aliyuncs\.com/)) &&
      !url.href.includes('https://cdn.guole.fun/json/') &&
      !url.href.includes('https://cdn.guole.fun/media/') &&
      !url.href.includes('https://cdn.guole.fun/mp3/')
    )
  },
  new workbox.strategies.CacheFirst({
    cacheName: "cdn",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 60 * 60 * 24 * 30 //30day
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
);
