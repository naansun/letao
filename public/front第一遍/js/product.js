$(function () {

    //发送Ajax请求  获取数据  动态渲染页面
    //获取地址栏中传递过来的参数
    var id = getSearch('productId');
    // console.log(id);
    //根据id来发送ajax请求
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        dataType: 'json',
        success: function (info) {
            console.log(info);
            var htmlStr = template('product', info);
            $('.lt_main .mui-scroll').html(htmlStr);
            // 渲染完成轮播图结构后, 进行轮播图初始化
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
            });
            // 初始化数字框
            mui('.mui-numbox').numbox()
        }

    })

    // 给每个尺码按钮添加点击事件（使用事件委托）
    $('.lt_main').on('click', '.lt_size span', function () {

        $(this).addClass('current').siblings().removeClass('current');
    })


    //购物车功能
    $('#addCart').click(function () {
        var size = $('.lt_size span.current').text();
        var num = $('.mui-numbox-input').val();
        if (size === null) {
            mui.toast("请选择尺码");
            return;
        }
        $.ajax({
            type: 'post',
            url: '/cart/addCart',
            data: {
                productId: id,
                size: size,
                num: num
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.error === 400) {
                    location.href = 'login.html?retUrl=' + location.href;
                    return;
                }
                if (info.success) {
                    mui.confirm('添加成功', '温馨提示', ['去购物车', '继续浏览'], function (e) {
                        if (e.index === 0) {
                            location.href = 'cart.html';
                        }
                    })

                }

            }
        })

    })


})