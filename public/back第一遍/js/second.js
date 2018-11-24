$(function () {
    //定义全局变量
    var currentPage = 1; //当前页
    var pageSize = 5; //每页的条数

    //一进入页面就渲染
    render();

    function render() {
        //发送ajax请求  获取数据动态渲染页面
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('second', info);
                $('tbody').html(htmlStr);

                //分页的使用：
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage, //当前页
                    totalPages: Math.ceil(info.total / info.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        // console.log(page);
                        //赋值
                        currentPage = page;
                        //重新渲染
                        render();

                    }
                });


            }
        })

    }

    //功能二：点击添加按钮  显示二级分类添加模态框  动态渲染列表
    $('#addBtn2').click(function () {
        $('#secModal').modal('show');
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100,
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                var htmlStr = template('list', info);
                $('.dropdown-menu').html(htmlStr);
            }

        })
    })

    // 功能三：将选中的文本赋值给btn   列表是动态渲染  需要事件委托
    $('#down').on('click', 'a', function () {
        var txt = $(this).text();
        // console.log(txt);
        $('#addtxt').text(txt);
        var id = $(this).data('id');
        // 隐藏域
        $('[name="categoryId"]').val(id);
        //手动改变验证状态
        $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');

    })

    // 功能四：文件上传
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);
            var result = data.result;
            var picUrl = result.picAddr
            $('#imgbox').attr('src', picUrl)

            // 将图片地址赋值给隐藏域
            $('[name="brandLogo"]').val(picUrl);
            $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');

        }
    });

    //功能五：表单校验：
    $('#form').bootstrapValidator({
        // 配置排除项, 需要对隐藏域进行校验
        excluded: [],

        //配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 配置字段
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请输入一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传图片'
                    }
                }
            },
        }
    })

    //功能六：点击按钮阻止表单的默认行为后   并发送Ajax请求 
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.success) {
                    // 隐藏模态框
                    $('#secModal').modal('hide');
                    // 重新渲染
                    currentPage = 1;
                    render();

                    //内容和状态重置
                    $("#form").data('bootstrapValidator').resetForm(true);
                    // 手动设置按钮和文本的内容
                    $('#addtxt').text('请选择一级分类');
                    $('#imgbox').remove();


                }

            }

        })
    })



})