//- Guo Le's Blog
//- https://guole.fun/
//- 2023.5.10

//动态标签页标题
var OriginTitile = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    //离开当前页面时标签显示内容
    titleTime = setTimeout(function () {
      document.title = 'w(ﾟДﾟ)w 不要走！再看看嘛！';
    }, 300);
    // clearTimeout(titleTime); 清空时间
  }
  else {
    //返回当前页面时标签显示内容
    document.title = '♪(^∇^*)欢迎回来！' + OriginTitile;
    //两秒后变回正常标题
    titleTime = setTimeout(function () {
      document.title = OriginTitile;
    }, 2000);
  }
});
console.log("\n %c 欢迎来到 Guo Le's Blog %c https://guole.fun %c https://blog.guole.fun \n", "color: #f9ed69; background: #252a34; padding:5px 0;", "background: #3fc1c9; padding:5px 0;", "background: #3fc1c9; padding:5px 0;")

// 返回顶部 显示网页阅读进度
window.onscroll = percent; // 执行函数
// 页面百分比
function percent() {
  let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
    b =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
    result = Math.round((a / b) * 100), // 计算百分比
    btn = document.querySelector("#percent"); // 获取图标
  if (result > 0 && result < 99) {
    document.getElementById('nav-totop').classList.remove("long")
    btn.innerHTML = result
  } else {
    document.getElementById('nav-totop').classList.add("long")
    btn.innerHTML = '返回顶部'
  }
  // result <= 99 || (result = 99), (btn.innerHTML = result);
}
document.getElementById("page-name-text").innerText = document.title.split(" | Guo Le's Blog")[0];
document.addEventListener("pjax:complete", (function () {
  document.getElementById("page-name-text").innerText = document.title.split(" | Guo Le's Blog")[0];
}
))

//暗色模式
function switchDarkMode() {  // Switch Between Light And Dark Mode
  const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  if (nowMode === 'light') {
    activateDarkMode()
    saveToLocal.set('theme', 'dark', 2)
    GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    document.getElementsByClassName('not-by-ai')[0].getElementsByTagName("img")[0].src = "/img/Written-By-Human-Not-By-AI-Badge-black.svg"
  } else {
    activateLightMode()
    saveToLocal.set('theme', 'light', 2)
    GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    document.getElementsByClassName('not-by-ai')[0].getElementsByTagName("img")[0].src = "/img/Written-By-Human-Not-By-AI-Badge-white.svg"
  }
  // handle some cases
  typeof utterancesTheme === 'function' && utterancesTheme()
  typeof FB === 'object' && window.loadFBComment()
  window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
}

//动态分类条
//https://npm.elemecdn.com/js-heo@1.0.11/categoryBar/categoryBar.js
function categoriesBarActive() {
  var urlinfo = window.location.pathname;
  urlinfo = decodeURIComponent(urlinfo)
  // console.log(urlinfo);
  //判断是否是首页
  if (urlinfo == '/') {
    if (document.querySelector('#category-bar')) {
      document.getElementById('首页').classList.add("select")
    }
  } else {
    // 验证是否是分类链接
    var pattern = /\/categories\/.*?\//;
    var patbool = pattern.test(urlinfo);
    var valuegroup = urlinfo.split("/");
    for (var n = 0; n <= valuegroup.length; n++) {
      n = valuegroup.length;
      var nowCategorie = valuegroup[n - 2];
    }
    // console.log(patbool);
    if (patbool) {
      // console.log(valuegroup[2]);
      if (document.querySelector('#category-bar')) {
        document.getElementById(nowCategorie).classList.add("select");
      }
    } else {
      var id;
      switch (nowCategorie) {
        case 'game':
          id = '小游戏';
          break;
      }
      if (document.querySelector('#category-bar')) {
        document.getElementById(id).classList.add("select");
      }
    }
  }
  categoriesBarNext()
}
//翻页按钮
function scrollCategoryBarToRight() {
  var e = document.getElementById("category-bar-items")
    , t = document.getElementById("category-bar-next")
    , o = e.clientWidth;
  e && (e.scrollLeft + e.clientWidth >= e.scrollWidth ? (e.scroll({
    left: 0,
    behavior: "smooth"
  }),
    t.innerHTML = '<i class="fa-solid fa-chevrons-right"></i>') : e.scrollBy({
      left: o,
      behavior: "smooth"
    }))
}
function categoriesBarNext() {
  if (document.getElementById("category-bar-items")) {
    var e = document.getElementById("category-bar-items")
    , t = document.getElementById("category-bar-next")
    if (e.scrollWidth > e.clientWidth) {
      t.innerHTML = '<i class="fa-solid fa-chevrons-right"></i>'
    } else {
      t.remove('i')
    }
  }
}
//窗口改变就执行
window.onresize = function() {
  categoriesBarNext()
}

//鼠标控制横向滚动
function topCategoriesBarScroll() {
  if (document.getElementById("category-bar-items")) {
    let xscroll = document.getElementById("category-bar-items");
    xscroll.addEventListener("mousewheel", function (e) {
      //计算鼠标滚轮滚动的距离
      let v = -e.wheelDelta / 2;
      xscroll.scrollLeft += v;
      //阻止浏览器默认方法
      e.preventDefault();
    }, false);
  }
}
function sayhi() {
  document.querySelector("#author-info__sayhi") && (document.getElementById("author-info__sayhi").innerHTML = getTimeState() + "！我是")
}
function getTimeState() {
  var timeNow = new Date();
  var hours = timeNow.getHours();
  var text = '👋 访客你好';
  if ((hours >= 0 && hours < 6) || hours == 24) {
    text = '😴 夜猫子晚安';
  } else if (hours > 6 && hours <= 10) {
    text = '🥪 早上好';
  } else if (hours > 10 && hours <= 14) {
    text = '☀️ 中午好';
  } else if (hours > 14 && hours <= 18) {
    text = '🏖️ 下午好';
  } else if (hours > 18 && hours < 23) {
    text = '🍻 晚上好';
  } 
  return text;
}
function changeSayHelloText() {
  const e = ["🤖️ 数码科技爱好者", "🔍 分享与热心帮助", "🏠 智能家居小能手", "🔨 设计开发一条龙", "🤝 专修交互与设计", "🏃 脚踏实地行动派", "🧱 团队小组发动机", "💢 壮汉人狠话不多"]
    , t = document.getElementById("author-info__sayhi");
  let o = e[Math.floor(Math.random() * e.length)];
  for (; o === lastSayHello;)
    o = e[Math.floor(Math.random() * e.length)];
  t.textContent = o,
    lastSayHello = o
}

//复制文章链接
function copyPageUrl() {
  var url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    // console.log('文本被成功复制到剪贴板');
    btf.snackbarShow('复制页面 URL 地址成功 ✨✨')
  },() => {
    // console.error('文本未被复制到剪贴板');
    btf.snackbarShow('糟糕，复制失败了。请重试 👽️👽️')
  });
}

function qrcodeCreate() {
  if (document.getElementById("qrcode")) {
      document.getElementById("qrcode").innerHTML = "";
      new QRCode(document.getElementById("qrcode"),{
          text: window.location.href,
          width: 250,
          height: 250,
          colorDark: "#000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
      })
  }
}
function AddRewardMask() {
  $(".reward-main").attr("style", "display: flex"),
  $("#quit-box").attr("style", "display: flex")
}

//方法调用
categoriesBarActive()
topCategoriesBarScroll()
sayhi()
qrcodeCreate()
//pjax 兼容：只要 pjax 结束就执行
document.addEventListener("pjax:complete", (function () {
  categoriesBarActive()
  topCategoriesBarScroll()
  sayhi()
  qrcodeCreate()
}))