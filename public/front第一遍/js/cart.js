$(function () {
    // 1. 一进入页面, 发送请求, 获取当前购物车数据
    //   (1) 如果当前用户未登录, 后台返回 error,  拦截到登录页
    //   (2) 如果当前用户已登录, 后台返回 购物车数据
    render();
    //获取数据   渲染页面
    function render() {
        $.ajax({
            type: 'get',
            url: '/cart/queryCart',
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.error === 400) {
                    location.href = 'login.html?retUrl=' + location.href;
                    return;
                }
                var htmlStr = template('cart', {
                    data: info
                });
                $('.mui-table-view').html(htmlStr);


            }

        })
    }

    //删除功能
    //通过事件委托来实现
    $('.mui-table-view').on('click', 'li .btn_delete', function () {
        var id = $(this).data('id');
        // console.log(id);
        $.ajax({
            type: 'get',
            url: '/cart/deleteCart',
            data: {
                id: id
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.success) {
                    render();
                }

            }
        })
    })


})