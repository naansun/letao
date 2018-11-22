$(function () {
    //发送ajax请求
    //定义全局变量：
    var currentPage = 1;
    var pageSize = 5;
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
        data: {
            page: currentPage,
            pageSize: pageSize
        },
        dataType: 'json',
        success: function (info) {
            console.log(info);
            var htmlStr = template('first', info);
            $('tbody').html(htmlStr);
        }


    })
})