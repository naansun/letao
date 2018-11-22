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
})