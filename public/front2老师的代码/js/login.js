/**
 * Created by 54721 on 2018/11/26.
 */
$(function() {

  // 登录功能, 点击按钮, 发送登录请求即可
  $('#loginBtn').click(function() {

    // 获取用户名 和 密码
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();

    // 非空判断
    if ( username === "" ) {
      mui.toast( "请输入用户名" );
      return;
    }
    if ( password === "" ) {
      mui.toast( "请输入密码" );
      return;
    }

    $.ajax({
      type: "post",
      url: "/user/login",
      data: {
        username: username,
        password: password
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.error === 403 ) {
          mui.toast("用户名或者密码错误");
          return;
        }

        if ( info.success ) {
          // 登录成功
          // (1) 有传参, 传递了retUrl, 需要跳转回去
          // (2) 没有传参, 跳转到会员中心页
          if ( location.search.indexOf("retUrl") != -1 ) {
            // 有传参, 将参数地址获取, 跳回去
            // "?retUrl=http://localhost:3000/front/product.html?productId=8"
            var retUrl = location.search.replace("?retUrl=", "");

            // 得到地址, 跳回去
            location.href = retUrl;
          }
          else {
            // 没传参, 跳到用户页
            location.href = "user.html";
          }
        }
      }
    })


  })


})
