$(function () {
    //功能一：
    // //开启进度条
    // NProgress.start();
    // setTimeout(function () {
    //     //关闭进度条
    //     NProgress.done();

    // }, 3000)

    // ajaxStart()     在第一个ajax请求发送时调用
    // ajaxStop()      在所有的ajax请求完成时调用

    $(document).ajaxStart(function () {
        NProgress.start();
    })
    $(document).ajaxStop(function () {
        setTimeout(function () {
            //关闭进度条
            NProgress.done();

        }, 1000)
    })

    //功能二：
    // 公用的功能  左侧二级切换功能
    //点击元素，使隐藏的元素显示出来   注意bug：stop()解决动画栈队堆积问题
    $('#change').click(function () {
        $(this).next().stop().slideToggle();
    })

    //功能三：左侧菜单切换功能
    $('.icon-left').click(function () {
        $('.letao_left').toggleClass('hidetag')
        $('.lt_top').toggleClass('hidetag')
        $('.letao_content').toggleClass('hidetag')
    })


    // 功能四：点击显示模态框
    $('.icon-right').click(function () {
        $('#myModal').modal('show');
    })


    // 功能五：点击退出按钮，删除用户的登陆信息，提示登录页面
    $('#exit').click(function () {
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    location.href = 'login.html';
                }
            }
        })

    })



})