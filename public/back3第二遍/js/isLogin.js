//直接发送ajax请求判断用户是否已经登陆
$.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function (info) {
        console.log(info);
        if (info.error === 400) {
            location.href = 'login.html';
        }
        if (info.success) {
            console.log('该用户已经登陆');
        }

    }

})