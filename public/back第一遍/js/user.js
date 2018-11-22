// 发送ajax请求   获取数据 动态渲染表格区域
$(function () {
    //发送ajax请求：
    $.ajax({
        type: 'get',
        url: '/user/queryUser',
        data: {
            page: 1,
            pageSize: 5
        },
        dataType: 'json',
        success: function (info) {
            console.log(info);
            var htmlStr = template('tmp', info);
            $('tbody').html(htmlStr);
        }
    })



})