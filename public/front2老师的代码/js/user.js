/**
 * Created by 54721 on 2018/11/26.
 */
$(function() {

  // 1. 用户个人信息渲染 (需要当前用户登陆)
  // 发送个人信息的请求, 会有两种响应
  // (1) 当前用户未登录,  响应 error, 提示未登录, 拦截到登录页
  // (2) 当前用户已登录,  响应 当前用户的信息,  进行渲染
  $.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    dataType: "json",
    success: function( info ) {
      console.log( info );
      if ( info.error === 400 ) {
        // 未登录, 拦截到登录页
        location.href = "login.html";
        return;
      }

      // 说明当前用户已登录, 并且 info 就是个人信息
      var htmlStr = template( "userTpl", info );
      $('#userInfo').html( htmlStr );
    }
  })


  // 2. 退出功能
  $('#logout').click(function() {
    $.ajax({
      type: "get",
      url: "/user/logout",
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 退出成功
          location.href = "login.html";
        }
      }
    })
  })


})
