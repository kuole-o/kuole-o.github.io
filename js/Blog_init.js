"use strict";const nowMode="dark"===document.documentElement.getAttribute("data-theme")?"dark":"light",notByAi=document.getElementsByClassName("not-by-ai").length,universe=document.getElementById("universe");function initBlog(){pathInfo=window.location.pathname,guole.bbtalkBanner(),guole.init_categoryBarBanner(),guole.sayhi(),guole.pagePercent(),guole.pageNameRevise(),guole.categoriesBarActive(),guole.tagsBarActive(),guole.topCategoriesBarScroll(),guole.qrcodeCreate(),guole.addFriendLinksInFooter(),guole.moviePageModification(),guole.initCommentTips(),guole.clearCommentInput()}btf.saveToLocal.set("theme",nowMode,2),"dark"===nowMode?(notByAi>0&&(document.getElementsByClassName("not-by-ai")[0].getElementsByTagName("img")[0].src="/img/Written-By-Human-Not-By-AI-Badge-black.svg"),universe&&(universe.style.display="block")):(notByAi>0&&(document.getElementsByClassName("not-by-ai")[0].getElementsByTagName("img")[0].src="/img/Written-By-Human-Not-By-AI-Badge-white.svg"),universe&&(universe.style.display="none")),window.addEventListener("scroll",(function(){let e=document.querySelector("#footer-bar"),t=document.querySelector("#nav-music.needEndHide");e.getBoundingClientRect().top<=window.innerHeight?t.classList.add("hide"):t.classList.remove("hide")})),document.addEventListener("click",(function(e){const t=document.querySelector(".reward-main"),n=document.querySelector("button.reward-button.button--animated");if(t&&"none"!==t.style.display){let o=t.contains(e.target),a=e.target.classList.contains("reward-button")&&e.target.classList.contains("button--animated");o||a||(t.style.display="none",n.style.background="var(--guole-red)",n.style.boxShadow="var(--guole-shadow-red)")}})),console.log("\n %c 欢迎来到 Guo Le's Blog %c https://guole.fun %c https://blog.guole.fun \n","color: #f9ed69; background: #252a34; padding:5px 0;","background: #3fc1c9; padding:5px 0;","background: #3fc1c9; padding:5px 0;"),window.onresize=function(){guole.categoriesBarNext()},window.onscroll=guole.pagePercent,initBlog(),document.addEventListener("pjax:complete",(function(){initBlog(),guole.twikooPath(),document.getElementsByClassName("el-textarea__inner")[0]&&(document.getElementsByClassName("el-textarea__inner")[0].value=""),console.log("Blog_init.js 触发 pjax:complete 事件。"),window.lazyLoadInstance.update()}));