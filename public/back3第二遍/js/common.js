// 在发送ajax请求时开启进度条
$(document).ajaxStart(function () {
    //开启进度条
    NProgress.start();

});
$(document).ajaxStop(function () {
    //关闭进度条
    setTimeout(function () {
        NProgress.done();

    }, 2000)

});


$(function () {
    //功能一：点击退出按钮，显示模态框
    $('.icon-right').click(function () {
        $('#myModal').modal('show')
    })

    //功能二：点击分类管理，使二级目录显示
    $('.cateBtn').click(function () {
        $('.child').stop().slideToggle();
    })
    //功能三：点击icon-left按钮使侧边栏隐藏
    $('.icon-left').click(function () {
        $('.lt_left').toggleClass('hidetag');
        $('.lt_content').toggleClass('hidetag');
        $('.lt_top').toggleClass('hidetag');
    })


    //功能四:点击exitBtn按钮  发送Ajax请求  清空用户的登录信息
    $('#exitBtn').click(function () {
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    // 模态框隐藏
                    $('#myModal').modal('hide')
                    location.href = 'login.html';

                }
            }

        })
    })
})