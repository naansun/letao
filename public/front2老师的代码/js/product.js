/**
 * Created by 54721 on 2018/11/26.
 */
$(function() {

  // 1. 获取从列表页传递过来的 商品id
  var productId = getSearch("productId");

  // 2. 根据 productId 发送请求, 获取对应商品的数据, 进行渲染
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: productId
    },
    dataType: "json",
    success: function( info ) {
      console.log( info );
      var htmlStr = template("productTpl", info);
      $('.lt_main .mui-scroll').html( htmlStr );

      // 渲染完成轮播图结构后, 进行轮播图初始化
      // 获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:5000 //自动轮播周期，若为0则不自动播放，默认为0；
      });

      // 初始化数字框
      mui('.mui-numbox').numbox()
    }
  });


  // 3. 给尺码添加可选功能
  $('.lt_main').on("click", ".lt_size span", function() {
    // 给自己加上 current类, 移除其他的current
    $(this).addClass("current").siblings().removeClass("current");
  });


  // 4. 加入购物车功能
  $('#addCart').click(function() {

    // 获取尺码, 数量
    var size = $('.lt_size span.current').text();
    var num = $('.mui-numbox-input').val()

    if ( size === null ) {
      // 没有选择尺码
      mui.toast("请选择尺码");
      return;
    }

    // 发送 ajax 请求, 加入购物车
    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        productId: productId,
        size: size,
        num: num
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        // (1) 未登录, 拦截到登录页,
        //     由于登录成功还要跳回来, 可以将整个当前页面的地址作为参数传递过去
        if ( info.error === 400 ) {
          location.href = "login.html?retUrl=" + location.href;
          return;
        }

        // (2) 已登录, success 加入成功
        if ( info.success ) {
          // 给用户提示
          mui.confirm("添加成功", "温馨提示", ["去购物车", "继续浏览"], function( e ) {
            // e.index 标记当前点击的按钮下标
            if ( e.index === 0 ) {
              // 去购物车
              location.href = "cart.html";
            }
          })
        }
      }
    })

  })

})
