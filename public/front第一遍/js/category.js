$(function () {
    // 功能一：发送ajax请求 获取一级分类的数据  动态渲染
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        dataType: 'json',
        success: function (info) {
            console.log(info);
            var htmlStr = template('first', info);
            $('.cate_nav').html(htmlStr);
            render(info.rows[0].id);

        }
    });

    // 功能二：使用事件委托  给a注册点击事件  发送ajax请求  获取
    //二级分类的数据内容   进行动态渲染
    $('.cate_nav').on('click', 'a', function () {
        // console.log(id);
        $('.cate_nav a').removeClass('current');
        $(this).addClass('current');

        var id = $(this).data('id');
        render(id);


    })

    function render(id) {
        // 发送ajax请求
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategory',
            data: {
                id: id,
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('second', info);
                $('.category_right ul').html(htmlStr);

            }

        })
    }

})