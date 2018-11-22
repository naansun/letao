// 功能一：发送ajax请求   获取数据 动态渲染表格区域
$(function () {
    //定义全局变量：
    var currentPage = 1; //当前页
    var pageSize = 5; //每页的条数
    var currentId;
    var isDelete;
    //封装一个渲染函数
    render();

    function render() {
        //发送ajax请求：
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('tmp', info);
                $('tbody').html(htmlStr);


                //分页功能：因为要使用ajax请求中的内容  因此需要放在ajax请求内部
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page, //当前页
                    totalPages: Math.ceil(info.total / info.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (a, b, c, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        // console.log(page);
                        currentPage = page;
                        //重新渲染页面
                        render();
                    }
                });
            }
        })

    }

    //功能二：点击禁用  启用按钮 弹出模态框
    //因为禁用  启用按钮内容是动态渲染的，所以要使用事件委托事件
    $('tbody').on('click', 'button', function () {
        $('#userModal').modal('show');
        // 获取用户id
        currentId = $(this).parent().data('id');
        // console.log(currentId);
        //获取修改状态
        isDelete = $(this).hasClass('btn-success') ? 0 : 1;
        // console.log(isDelete);

    })

    //功能三：点击模态框确认按钮  完成用户的启用禁用
    $('#sure').click(function () {
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id: currentId,
                isDelete: isDelete //要修改的的样式

            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    //隐藏模态框
                    $('#userModal').modal('hide');
                    // 重新渲染页面
                    render();
                }
            }
        })
    })







})