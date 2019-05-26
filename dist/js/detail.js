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
}

function xiangqing() {
  var mtb = document.getElementsByClassName("mtb-bd")[0]; // 从这里开始ajax的跨域

  var xhr = new XMLHttpRequest();
  xhr.open("get", "http://localhost:3000/xiangqing?productid=f2dda7ce-3169-4c1d-9e7d-f90dfd0af13b&_=1558761519596");

  xhr.onload = function () {
    //    接受ajax数据
    var data = JSON.parse(xhr.response);
    mtb.innerHTML = "";
    var list = data.Data.Description;
    var ht = template("SPdetail", list);
    mtb.innerHTML += ht;
  };

  xhr.send();
}

function gengduo() {
  var hotproducts = document.getElementById("hot-products");
  var xhr = new XMLHttpRequest();
  xhr.open("get", "http://localhost:3000/xiangqing?sellerid=1167248&pageindex=1&pagesize=5&_=1558769236342");

  xhr.onload = function () {
    var data = JSON.parse(xhr.response); // console.log(data);

    hotproducts.innerHTML = "";
    var list = data.Data.ProductList;
    var ht = template("GD", list);
    hotproducts.innerHTML += ht;
  };

  xhr.send();
}

function tuijian() {
  var recommend = document.getElementById("recommend-products");
  var xhr = new XMLHttpRequest();
  xhr.open("get", "http://localhost:3000/xiangqing?productid=f2dda7ce-3169-4c1d-9e7d-f90dfd0af13b&pageindex=1&pagesize=5&_=1558769637331");

  xhr.onload = function () {
    var data = JSON.parse(xhr.response);
    recommend.innerHTML = "";
    var list = data.Data.ProductList;
    var ht = template("TJ", list);
    recommend.innerHTML += ht;
  };

  xhr.send();
}

function fangdajing($) {
  var $smallImg = $("#vertical");
  var $smallGlass = $("#winSelector");
  var $bigImg = $("#bigImg");
  var $bigGlass = $("#bigView"); // 定义在小图片上面的放大镜的宽度和高度
  // console.log($bigGlass.width()/$bigImg.width()*$smallImg.width());

  $smallGlass.width($bigGlass.width() / $bigImg.width() * $smallImg.width());
  $smallGlass.height($bigGlass.width() / $bigImg.width() * $smallImg.width()); // 定义一个鼠标移入事件，但是hover可以定义两个函数，一个是移入一个是移出

  $smallImg.hover(function () {
    // 这里是移入事件
    $smallGlass.show();
    $bigGlass.show();
  }, function () {
    // 这里是移出事件
    $smallGlass.hide();
    $bigGlass.hide();
  }); // 鼠标移动事件

  $smallImg.mousemove(function (e) {
    // 计算smallGlass的坐标位置
    var _left = e.clientX - $smallImg.offset().left - $smallGlass.width() / 2;

    var _top = e.clientY - $smallImg.offset().top + $smallGlass.height() / 2;

    _left = Math.min(Math.max(0, _left), $smallImg.width() - $smallGlass.width());
    _top = Math.min(Math.max(0, _top), $smallImg.height() - $smallGlass.height()); // 把计算好的坐标位置赋值给smallGlass
    // 这个是给这个元素进行设置位置坐标

    $smallGlass.css({
      "left": _left,
      "top": _top
    }); // 同时更改bigImg的位置

    var scale = $bigImg.width() / $smallImg.width();
    $bigImg.css({
      "left": -scale * _left,
      "top": -scale * _top
    });
  });
}

function xuanxiangka() {
  var imageMenu = document.getElementById("imageMenu").children[0].children;
  var midimg = document.getElementById("midimg");
  var bigImg = document.getElementById("bigImg");
  imageMenu = Array.from(imageMenu); // console.log(imageMenu[0]);

  imageMenu.forEach(function (item) {
    item.addEventListener("mouseover", function () {
      midimg.src = item.children[0].children[0].src;
      bigImg.src = item.children[0].children[0].src;
      midimg.style.width = "100%";
      midimg.style.height = "100%";
      bigImg.style.width = "200%";
      bigImg.style.height = "200%";
      console.log(item.children[0].children[0].src);
    }); // item.addEventListener("mouseout",function(){
    //     midimg.src="http://pic1.ymatou.com/G02/shangou/M08/1A/71/CgvUA1wHa9eAZ2-QAAEu_4L9aso340_1_1_n_w_o.jpg";
    //     bigImg.src="http://pic1.ymatou.com/G02/shangou/M08/1A/71/CgvUA1wHa9eAZ2-QAAEu_4L9aso340_1_1_n_w_o.jpg";
    // })
  });
}

function SPadd() {
  var biadd = document.getElementsByClassName("bi-add")[0];
  var amount = document.getElementsByClassName("amount")[0];
  var bireduce = document.getElementsByClassName("bi-reduce ")[0];
  var reduce = document.getElementsByClassName("reduce")[0];

  biadd.onclick = function () {
    var count = parseInt(amount.value);
    amount.value = ++count;
  };

  bireduce.onclick = function () {
    var count = parseInt(amount.value);

    if (count <= 0) {
      reduce.className = "numbutton reduce disabled";
    } else {
      amount.value = --count;
    }
  };
}

function guige() {
  var color_list = document.getElementById("color_list").children;
  var color = Array.from(color_list);
  color.forEach(function (item) {
    item.onclick = function () {
      for (var i = 0; i < color.length; i++) {
        color[i].className = "item";
      }

      item.className = "item active";
    };
  });
}