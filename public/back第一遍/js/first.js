$(function () {
    //发送ajax请求
    //定义全局变量：
    var currentPage = 1;
    var pageSize = 5;
    //一进页面就渲染
    render();

    function render() {
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

                // 分页功能
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page, //当前页
                    totalPages: Math.ceil(info.total / info.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        // 重新渲染
                        render();
                    }
                });

            }


        })

    }



    //功能二：点击添加分类按钮  显示添加分类模态框
    $('#addBtn').click(function () {
        $('#addModal').modal('show');
    })



    //功能三：表单验证
    $('#form').bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '请输入一级分类'
                    }
                }

            }


        }

    })


    // 功能四：//1.1  阻止默认的表单提交行为。
    //1.2点击添加按钮发送ajax请求，向数据库中添加数据 渲染页面
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    $('#addModal').modal('hide');
                    // 显示第一页
                    currentPage = 1;
                    render();

                    //内容和状态重置
                    $("#form").data('bootstrapValidator').resetForm(true);
                }
            }


        })
    });
})