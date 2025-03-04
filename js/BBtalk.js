"use strict";var bbtalk_limit=12,bbtalk_name="八章",bbtalk_avatar="/img/gl.jpg",bbtalk_avatar_svg='<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="is-badge"><path d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z" fill="#1da1f2"></path></svg>';let bbtalkPage=1,bbtalkIsLoading=!1;const BBtalk_init=()=>{const e=document.getElementById("load-more-btn"),t=document.getElementById("loading"),a=document.getElementById("bbtalk-bottom-tip");if(!t||!e||bbtalkIsLoading)return;bbtalkIsLoading=!0,t.style.display="block",e.style.display="none";const n=Math.floor(Date.now()/1e3/180);guole.getData({url:`https://cdn.guole.fun/json/bb-json/bbtalk_page${bbtalkPage}.json`,method:"GET",params:{t:n},cacheName:"BBtalk",cacheKey:"list",cacheMinutes:10}).then((n=>{const r=document.querySelector("p.info");r&&(r.innerHTML=`共计发送 ${n.count} 条闪念`),renderData(n),bbtalkPage++,bbtalkIsLoading=!1,t.style.display="none",e.style.display="block",e.addEventListener("click",BBtalk_init),a.style.display="none",n.results.length<bbtalk_limit&&(e.style.display="none",t.style.display="none",a.style.display="block")})).catch((a=>{console.error(a),bbtalkIsLoading=!1,t.style.display="none",e.style.display="block"}))},renderData=e=>{e.results.forEach((e=>{const t=createTimenode(e),a=document.getElementById("bbtalk");if(a&&a.appendChild(t),"location"===e.MsgType){const t=document.createElement("script");t.innerHTML=e.other,document.body.appendChild(t)}else"music"===e.MsgType&&renderMusicAPlayer(e)}))},renderMusicAPlayer=e=>{let t=`${e.other.lrc}`,a=3;t||(a=1,t="[00:00.00] 暂无歌词");const n=`\n    new APlayer({\n      container: document.getElementById('${e.objectId}'),\n      lrcType: ${a},\n      audio: [{\n          name: '${e.other.name}',\n          artist: '${e.other.artist}',\n          url: '${e.other.url}',\n          cover: '${e.other.cover}',\n          lrc: '${t}',\n      }]\n  });\n  `,r=document.createElement("script");r.innerHTML=n,document.getElementById(`${e.objectId}`).appendChild(r)},createTimenode=e=>{const t=document.createElement("div");let a,n=guole.formatTime(e.createdAt),r=timeago.format(n,"zh_CN"),l=urlToLink(e.content,e.MsgType,!0),o=urlToLink(e.content,e.MsgType,!1);switch(!0){case e.from.includes("Chrome"):a="var(--bbtalk-from-chrome)";break;case e.from.includes("WeChat"):a="var(--bbtalk-from-wechat)";break;case e.from.includes("Postman"):a="var(--bbtalk-from-postman)";break;case e.from.includes("Edge"):a="var(--bbtalk-from-edge)";break;case e.from.includes("Siri"):a="var(--bbtalk-from-siri)";break;default:a="var(--bbtalk-from-bg)"}return t.innerHTML=`\n    <div class="card-name">\n      <div class="avatar">\n        <img src=${bbtalk_avatar} class="avatar-img no-lightbox nolazyload">\n      </div>\n      <div class="name">${bbtalk_name}</div>\n      ${bbtalk_avatar_svg}\n      <div class="time">\n        <p>\n          <time datetime="${n}" data-msg="${n}">${r}</time>\n        </p>\n      </div>\n    </div>\n    <div class="body">\n      <div class="bbtalk-content">\n      ${l}\n      <div class="bbtalk-media" id="${e.objectId}"></div>\n      </div>\n      <div class="bbtalk-bottom">\n        <div class="bbtalk-from" style="background-color: ${a};color: var(--bbtalk-from-color)">\n          <span>${e.from}</span>\n        </div>\n        <a id="bbtalk-reply" class="bbtalk-reply" onclick="guole.quoteComment(\`${o}\`)">\n          <i class="iconfont icon-xiaoxi4"></i>\n        </a>\n      </div>\n    </div>\n  `,t.classList.add("timenode","wow","animate__zoomIn"),t},getFromColor=e=>{switch(!0){case e.includes("Chrome"):return"var(--bbtalk-from-chrome)";case e.includes("WeChat"):return"var(--bbtalk-from-wechat)";case e.includes("Postman"):return"var(--bbtalk-from-postman)";case e.includes("Edge"):return"var(--bbtalk-from-edge)";case e.includes("Siri"):return"var(--bbtalk-from-siri)";default:return"var(--bbtalk-from-bg)"}},replaceUrl=(e,t,a)=>{switch(a){case"image":return e.replace(t.href,"[图片]");case"video":return e.replace(t.href,"[视频]");case"music":return e.replace(t.href,"[音乐]");default:return e.replace(t.href,"[外部链接]")}},processMediaContent=(e,t,a)=>{const n=new URLSearchParams(t.search),r=t.pathname;switch(a.type){case"image":return e.replace(t.href,`<a href="${a.url}" alt="image" data-fancybox="gallery" target="_blank" rel="noopener noreferrer"><img alt="image" src="${a.url}"></a>`);case"video":return e.replace(t.href,`<video alt="${a.url}" src="${a.url}" controls></video>`);case"music":const l="i.y.qq.com"===t.hostname?"tencent":"netease",o=r.includes("playlist")||r.includes("details")?"playlist":"song",s=n.get("songid")||n.get("songmid")||n.get("id");return e.replace(t.href,`<meting-js server="${l}" type="${o}" id="${s}"></meting-js>`);default:return e.replace(t.href,`<a href="${a.url}" alt="外部链接" target="_blank" rel="noopener noreferrer"> [外部链接]</a>`)}},urlToLink=(e,t,a)=>{const n=/(<div[^>]*>(.*?)<\/div>|<\/div>)/is,r=/<br>/g,l=/<[^>]+>/g,o=guole.getUrlInfo(e);return a?o.forEach((t=>{const a=new URL(t.url);e=processMediaContent(e,a,t)})):(o&&o.length>0&&o.forEach((t=>{const a=new URL(t.url);e=replaceUrl(e,a,t.type)})),"location"===t&&(e=e.replace(n," [位置]")),e=(e=e.replace(r,"")).replace(l,"")),e};document.addEventListener("pjax:complete",(function(){bbtalkPage=1;const e=document.getElementById("loadMoreBtn");e&&e.removeEventListener("click",BBtalk_init),BBtalk_init()})),BBtalk_init();