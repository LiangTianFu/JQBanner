$(function() {
  var i = 0;
  //克隆第一张图片
  var clone = $(".banner .img li").first().clone();
  $(".banner .img").append(clone); //把克隆的第一张图片添加到最后面
  var size = $(".banner .img li").size();
  //根据图片的数量内部添加li
  for (var j = 0; j < size - 1; j++) {
    $(".banner .num").append("<li></li>");
  }

  $(".banner .num li").first().addClass("on");

  //鼠标划入圆点切换
  $(".banner .num li").hover(function() {
    var index = $(this).index();
    i = index; //同步i和index
    $(".banner .img").stop().animate({
      left: -index * 520
    }, 500) //siblings筛选同类元素  removeClass移除样式  addClass添加样式
    $(this).addClass("on").siblings().removeClass("on");
  })


  //向左的按钮
  $(".banner .btn_l").click(function() {
    i++;
    move();
  })
  //向右的按钮
  $(".banner .btn_r").click(function() {
    i--;
    move();
  })
  //核心函数
  function move() {
    //判断向左还是向右
    if (i == size) {
      $(".banner .img").css({
        left: 0
      }) //把移动到最后的图片拉到left：0的位置
      //i = 0;
      i = 1;
    }
    if (i == -1) {
      $(".banner .img").css({
        left: -(size - 1) * 520
      }) //把移动到-1的图片拉到left: -(size - 1) * 520的位置
      //i = size - 1;
      i = size - 2;
    }
    $(".banner .img").stop().animate({
      left: -i * 520
    }, 500)

    //bug解决
    if (i == size - 1) {
      $(".banner .num li").eq(0).addClass("on").siblings().removeClass("on");
    } else {
      $(".banner .num li").eq(i).addClass("on").siblings().removeClass("on");
    }

  }



  //自动轮播
  var timer = setInterval(function() {
    i++;
    move();
  }, 2000);

  //对banner定时器的操作
  $(".banner").hover(function() {
    clearInterval(timer); //鼠标移入停止轮播  clearInterval(timer)
  }, function() { //鼠标移出继续轮播
    timer = setInterval(function() {
      i++;
      move();
    }, 2000);
  })
})
