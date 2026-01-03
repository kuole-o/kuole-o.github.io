const workboxVersion = '6.5.4';

importScripts(`https://storage.googleapis.com/workbox-cdn/releases/${workboxVersion}/workbox-sw.js`);

workbox.core.setCacheNameDetails({
  prefix: "Guo Le's Blog"
});

self.skipWaiting();
workbox.core.clientsClaim();

// 注册成功后要立即缓存的资源列表
// 具体缓存列表在gulpfile.js中配置，见下文
workbox.precaching.precacheAndRoute([{"revision":"328ec8c4fde31a352958b921efa49838","url":"./404.html"},{"revision":"604c8705afdd53450eab37229b1945d5","url":"./index.html"},{"revision":"f8e76485cc4745a52452b693d1256ce6","url":"./js/main.js"}], {
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

// 缓存 js / css / json 资源
workbox.routing.registerRoute(
  ({ url }) => {
    if (url.href.includes('.css') || url.href.includes('.js')) {
      return url.href.match(/\/?(\.css|\.js|\.jp?eg|\.png)/) && !['Blog_init.js', 'Blog_utils.js', 'color.css', 'Blog.css'].includes(url.href.match(/\/?(\.css|\.js)/)[0]);
    } else {
      return url.href.match(/\/?(\.css|\.js|\.jp?eg|\.png)/);
    }
  },
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
  ({ url }) => {
    const match = url.href.match(/\/?(\.css|\.js)/);
    return match && ['Blog_init.js', 'Blog_utils', 'color.css', 'Blog.css'].includes(match[0]);
  },
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