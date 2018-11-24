$(function () {
    var currentPage = 1;
    var pageSize = 2;
    //定义一个用来存放上传图片的地址的数组
    var picArr = [];
    //已进入页面就调用
    render();

    // 功能一：发送ajax请求   动态渲染数据
    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                var htmlStr = template('goods', info);
                $('tbody').html(htmlStr);
                // 分页的容器准备
                $('#pagintor').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        // 重新渲染
                        render();
                    }



                })
            }
        })

    }

    // 功能二：点击添加按钮   显示模态框  发送ajax请求  动态渲染下拉列表
    $('#addBtn').click(function () {
        $('#goodsModal').modal('show');
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('list', info);
                $('#down').html(htmlStr);
            }
        })
        //功能三：将选中的内容赋值给按钮  使用事件委托
        $('#down').on('click', 'a', function () {
            var txt = $(this).text();
            var id = $(this).data('id');
            // 赋值
            $('#addtxt').text(txt);
            $('[name="brandId"]').val(id);

            //手动更新隐藏域的更新
            $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID');

        })


    })

    //功能四:表单验证
    $('#form').bootstrapValidator({
        excluded: [],
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类',
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称',
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述',
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存',
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存必须是非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺寸  ',
                    },
                    //正则校验
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '必须是xx-xx的格式, xx是两位数字, 例如: 36-44'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称',
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称',
                    }
                }
            },
            picstatus: {
                validators: {
                    notEmpty: {
                        message: '请上传三张图片',
                    }
                }
            }
        }

    })

    //功能五：文件上传
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data);
            // 图片信息  picAddr  picName
            var result = data.result;
            // console.log(result); 

            // 往数组的最前面添加图片信息
            picArr.unshift(result);
            // console.log(picArr);
            var picUrl = result.picAddr;
            // console.log(picUrl);
            $('#img').prepend('<img src="' + picUrl + '" style="width:100px">')
            if (picArr.length > 3) {
                //删除数组的最后一项
                picArr.pop();
                $('#img img:last-of-type').remove();
            }
            console.log(picArr);

            if (picArr.length === 3) {
                // 说明当前图片已经上传满 3 张, 需要将 picStatus 校验状态改成 VALID
                $('#form').data("bootstrapValidator").updateStatus("picstatus", "VALID");
            }

        }
    });


    //功能六：阻止表单的默认行为
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        var str = $('#form').serialize();
        // console.log(str);
        //直接拼接字符串
        str += '&picName1=' + picArr[0].picName + '&picAddr1=' + picArr[0].picAddr;
        str += '&picName2=' + picArr[1].picName + '&picAddr2=' + picArr[1].picAddr;
        str += '&picName3=' + picArr[2].picName + '&picAddr3=' + picArr[2].picAddr;
        // console.log(str);
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: str,
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    // 回到第一页
                    currentPage = 1;
                    // 隐藏模态框
                    $('#goodsModal').modal('hide');
                    render();
                }

            }
        })
    });








})