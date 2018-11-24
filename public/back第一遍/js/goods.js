$(function () {
    var currentPage = 1;
    var pageSize = 2;
    //已进入页面就调用
    render();

    // 功能一：发送ajax请求   动态渲染数据
    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                var htmlStr = template('goods', info);
                $('tbody').html(htmlStr);
                // 分页的容器准备
                $('#pagintor').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        // 重新渲染
                        render();
                    }



                })
            }
        })

    }

    // 功能二：点击添加按钮   显示模态框
    $('#addBtn').click(function () {
        $('#goodsModal').modal('show');

    })




})