//这个是那个图片的宽，也就是左右移动一次的距离

var iUl = document.getElementsByTagName("ul")[0];    //装图片的ul
var iSpan = document.getElementsByClassName('span')[0];//圆点点的盒子
var dots = iSpan.children;  //真正的圆点点
var arrow = document.getElementsByClassName('arrow')[0];
var lArrow = document.getElementsByClassName('arrow-left')[0];//左箭头
var rArrow = document.getElementsByClassName('arrow-right')[0];//右箭头
var iDiv = document.getElementById('imgbox'); //显示图片的div框

iUl.style.left = iUl.offsetLeft + "px";

var nowIndex = iUl.style.left;
var wantIndex;
var once;
var flag = true;  //设置一下，防止多点错误
var timer1;
var timer;


//左右箭头出来
iDiv.onmouseout = function () {
  lArrow.style.display = "none";
  rArrow.style.display = "none";
  moveauto(); //自动轮播
};
iDiv.onmouseover = function () {
  lArrow.style.display = "inline-block";
  rArrow.style.display = "inline-block";
  stopAutoPlay();
};

lArrow.onmouseover = function () {
  lArrow.style.backgroundColor = "rgba(140, 140, 140, 0.7)";
};
rArrow.onmouseover = function () {
  rArrow.style.backgroundColor = "rgba(140, 140, 140, 0.7)";
};

lArrow.onmouseout = function () {
  lArrow.style.backgroundColor = "rgba(140, 140, 140, 0.3)";
};
rArrow.onmouseout = function () {
  rArrow.style.backgroundColor = "rgba(140, 140, 140, 0.3)";
};

function stopAutoPlay() {
  clearInterval(timer1);
}

//点击左右箭头移动
lArrow.onclick = function () {
  if (flag) {
    var want = 1;
    moveleft(want);
  }
};
rArrow.onclick = function () {
  if (flag) {
    var want = -1;  //want是想要走多少
    moveleft(want);
  }
};

function moveleft(want) {
  flag = false;
  var now;
  now = parseInt(nowIndex) / 400;
  wantIndex = (want + now) * 400;
  if (wantIndex > -400) {
    iUl.style.left = "-3200px";
    nowIndex = "-3200px";
    wantIndex = -2800;
  }
  if (wantIndex < -2800) {
    iUl.style.left = "0";
    nowIndex = "0";
    wantIndex = -400;
    wantIndex = -400;
  }
  once = (wantIndex - parseInt(nowIndex)) / 50;  //回头再改这里让他走的平滑
  dotsColorChange(-(now + want));

  move();
}

function move() {
  timer = setInterval(function () {
    if (parseInt(nowIndex) !== wantIndex) {
      iUl.style.left = parseInt(nowIndex) + once + "px";
      nowIndex = parseInt(nowIndex) + once + "px";
//      console.log(nowIndex);
    }
    else {
      flag = true;
      clearInterval(timer);
    }
  }, 2);
}

function moveauto() {
  timer1 = setInterval(rArrow.onclick, 3000);
//  console.log(rArrow.onclick);  //定时效果就是。。让他4秒触发一次
}
//圆点点击！
function dotsClick() {
  var len = dots.length;
  for (var i = 0; i < len; i++) {
    //考虑闭包这个事情还是不考虑呢？
    (function (j) {
      dots[j].onclick = function () {
        flag = false;
        var now = parseInt(nowIndex) / 400;
        moveleft(-(j + 1) - now);
      }
    })(i)
  }
}

//圆点变色
function dotsColorChange(i) {
  //第 i 个圆点class变curent
  i --;
  console.log(i);
  var len = dots.length;
  for (var j = 0; j < len; j++) {

    if (j !== i) {
      dots[j].className = "";
    } else {
      dots[i].className = "current";
    }
  }
}

dotsClick();
moveauto(); //自动轮播
