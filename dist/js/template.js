"use strict";

// 这里是摸板字符串
function template(id, list) {
  var template = document.getElementById(id).innerHTML;
  template = 'print(`' + template + '`)';
  template = template.replace(/<%=(.+?)%>/g, '`)\nprint($1)\nprint(`');
  template = template.replace(/<%(.+?)%>/g, '`)\n$1\nprint(`');
  var codestr = "\n    (function(list){\n        let htmlstr=\"\";\n        function print(val){\n            htmlstr+=val;\n        }\n        ".concat(template, "\n        return htmlstr;\n    })\n    ");
  var fun = eval(codestr);
  var str = fun(list);
  return str;
} // 加载jsonp数据的函数


function xianshi($) {
  var categoryMenu = document.getElementById("categoryMenu");
  var downlist = document.getElementsByClassName("category-downlist")[0];
  var category = document.getElementsByClassName("category-box")[0];
  var wrapabc = document.getElementById("wrapabc");
  categoryMenu.addEventListener("mouseover", function () {
    $.ajax({
      url: "https://www.ymatou.com/guess/api/getCategoryBigList?_=1558660340020",
      dataType: "jsonp",
      jsonp: "callback",
      success: function success(data) {
        wrapabc.innerHTML = "";
        data.result.forEach(function (item) {
          var ht = template("fenlei", item);
          wrapabc.innerHTML += ht;
        });
      }
    });
    categoryMenu.className = "menu-item select";
    downlist.style.visibility = "visible";
    category.style.opacity = 1;
  });

  categoryMenu.onmouseout = function () {
    setTimeout(function () {
      categoryMenu.className = "menu-item";
      downlist.style.visibility = "hidden";
      category.style.opacity = 0;
    }, 1000);
  };
} // 这里是倒计时函数的


function getTime() {
  var time = 7200000;
  var hours = document.getElementsByClassName("hours")[0];
  var minutes = document.getElementsByClassName("minutes")[0];
  var seconds = document.getElementsByClassName("seconds")[0];
  setInterval(function () {
    var hour = parseInt(time / (1000 * 60 * 60));
    var min = parseInt((time - hour * 1000 * 60 * 60) / (1000 * 60));
    var sec = parseInt((time - hour * 1000 * 60 * 60 - min * 60 * 1000) / 1000);
    hours.innerHTML = "0" + hour;
    minutes.innerHTML = min;
    seconds.innerHTML = sec;
    time -= 1000;
  }, 1000);
} // 图片移动事件


function tupian() {
  var sliderpage = document.getElementsByClassName("slider-page")[0];
  var overimg = document.getElementById("overimg");

  overimg.onmouseover = function () {
    sliderpage.style.display = "block";
  };

  overimg.onmouseout = function () {
    sliderpage.style.display = "none";
  };
} // 图片轮播


function lunbo() {
  var swithtodaybanner = document.getElementsByClassName("swith-today-banner")[0].children;
  var qian = document.getElementById("qian");
  var hou = document.getElementById("hou");
  var i = 2;

  qian.onclick = function () {
    if (i == 0) {
      swithtodaybanner[8].className = "swith-img swith-img-prev";
      swithtodaybanner[i].className = "swith-img swith-img-active";
      swithtodaybanner[i + 1].className = "swith-img swith-img-next";
    } else if (i == 8) {
      swithtodaybanner[i - 1].className = "swith-img swith-img-prev";
      swithtodaybanner[i].className = "swith-img swith-img-active";
      swithtodaybanner[0].className = "swith-img swith-img-next";
    } else {
      swithtodaybanner[i - 1].className = "swith-img swith-img-prev";
      swithtodaybanner[i].className = "swith-img swith-img-active";
      swithtodaybanner[i + 1].className = "swith-img swith-img-next";
    }

    i++;
    i = i % 8;
  };

  hou.onclick = function () {
    if (i == 0) {
      swithtodaybanner[8].className = "swith-img swith-img-prev";
      swithtodaybanner[i].className = "swith-img swith-img-active";
      swithtodaybanner[i + 1].className = "swith-img swith-img-next";
      i = 8;
    } else if (i == 8) {
      swithtodaybanner[i - 1].className = "swith-img swith-img-prev";
      swithtodaybanner[i].className = "swith-img swith-img-active";
      swithtodaybanner[0].className = "swith-img swith-img-next";
      i = 0;
    } else {
      swithtodaybanner[i - 1].className = "swith-img swith-img-prev";
      swithtodaybanner[i].className = "swith-img swith-img-active";
      swithtodaybanner[i + 1].className = "swith-img swith-img-next";
    }

    i--;
  };
} // 这里是这是登录状态的函数


function denglu() {
  var title = document.getElementById("login");
  var yonghu = JSON.parse(sessionStorage.getItem("yonghu"));

  try {
    if (yonghu.user != "") {
      title.innerHTML = yonghu.user;
    }
  } catch (e) {}
} // 这里输入框中的提示


function shuru($) {
  var search = document.getElementsByClassName("J_input-search")[0]; // 这个是向里面插入内容的

  var sousuo = document.getElementById("sousuo");
  var searchrecomend = document.getElementById("search-recomend"); // 聚焦

  search.addEventListener("focus", function () {
    $.ajax({
      url: "https://www.ymatou.com/products/api/getEverybodySearch?_=1558748746678",
      dataType: "jsonp",
      jsonp: "callback",
      success: function success(data) {
        //console.log(data);
        sousuo.innerHTML = "";
        data.Data.KeywordList.forEach(function (list) {
          var ht = template("tishi", list);
          sousuo.innerHTML += ht;
        });
      }
    });
    searchrecomend.style.display = "block";
  }); // 失去焦点

  search.addEventListener("blur", function () {
    searchrecomend.style.display = "none";
  });
} // 返回顶部


function fanhuidingbu() {
  document.documentElement.scrollTop = document.body.scrollTop = 0;
}