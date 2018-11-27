$(function () {

    //发送ajax请求  获取数据  渲染页面
    $.ajax({
        type: 'get',
        url: "/user/queryUserMessage",
        dataType: 'json',
        success: function (info) {
            console.log(info);
            if (info.error == 400) {
                location.href = 'login.html';
                return;
            }
            var htmlStr = template('user', info);
            $('.mui-media-body').html(htmlStr);

        }


    })
    //点击退出按钮    发送ajax请求并销毁用户的登录信息
    $('#logout').click(function () {
        $.ajax({
            type: 'get',
            url: '/user/logout',
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.success) {
                    location.href = 'login.html';
                }

            }
        })


    })

})