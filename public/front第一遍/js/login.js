$(function () {
    // 点击登录按钮  发送Ajax请求   获取信息
    $('#loginBtn').click(function () {
        var userName = $('#username').val().trim();
        var psd = $('#password').val().trim();
        // console.log(userName, psd);
        if (userName === '') {
            mui.toast("请输入用户名");
            return;

        }
        if (psd === '') {
            mui.toast("请输入密码");
            return;
        }

        $.ajax({
            type: 'post',
            url: '/user/login',
            data: {
                username: userName,
                password: psd

            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.error === 403) {
                    mui.toast("用户名或者密码错误");
                    return;
                }
                if (info.success) {
                    // console.log('成功');
                    // 说明存在retUrl字符串
                    if (location.search.indexOf('retUrl') != -1) {
                        var retUrl = location.search.replace('?retUrl=', '');
                        location.href = retUrl;

                    } else {
                        location.href = 'user.html';
                    }
                }

            }


        })
    })

})