$(function () {
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
})