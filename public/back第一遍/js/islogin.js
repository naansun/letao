//登录拦截：对于未登录的用户, 拦截到登录页
$.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function (info) {
        // console.log(info);
        if (info.success) {
            console.log('该用户已经登录');
        }
        if (info.error === 400) {
            location.href = 'login.html';
        }
    }
})