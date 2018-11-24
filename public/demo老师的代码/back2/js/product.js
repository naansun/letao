/**
 * Created by 54721 on 2018/11/24.
 */

$(function() {

  var picArr = []; // 专门用于存储需要上传的图片

  // 1. 一进入发送ajax进行渲染
  var currentPage = 1;    // 当前页
  var pageSize = 3;  // 每页条数
  render();


  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template("productTpl", info);
        $('tbody').html( htmlStr );

        // 分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil( info.total / info.size ),
          onPageClicked: function( a, b, c, page ) {
            // 更新当前页
            currentPage = page;
            render();
          }
        })
      }
    })
  }



  // 2. 点击添加商品按钮, 显示添加模态框
  $('#addBtn').click(function() {
    $('#addModal').modal("show");

    // 发送 ajax, 请求所有的二级分类数据, 进行渲染
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template( "dropdownTpl", info );
        $('.dropdown-menu').html( htmlStr );
      }
    })
  });


  // 3. 给下拉框的 a 添加点击事件 (通过事件委托)
  $('.dropdown-menu').on("click", "a", function() {
    // 获取文本, 设置给按钮
    var txt = $(this).text();
    $('#dropdownText').text( txt );

    // 获取id, 设置给隐藏域
    var id = $(this).data("id");
    $('[name="brandId"]').val( id );

    // 将隐藏域的校验状态改成VALID
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  });



  // 4. 配置fileupload, 实现文件上传
  $('#fileupload').fileupload({
    dataType: "json", // 返回的数据类型
    // 文件上传的回调函数
    done: function( e, data ) {
      // console.log( data.result ); // 后台返回的数据

      var picObj = data.result; // 图片信息(图片名称/图片地址)
      // 往数组的最前面追加
      picArr.unshift( picObj );

      // 获取图片地址, 将图片添加到结构最前面
      var picUrl = picObj.picAddr;
      $('#imgBox').prepend('<img src="'+ picUrl +'" style="width: 100px;">');

      // push 往数组最后面追加
      // pop  删除最后一项
      // shift  删除第一项
      // unshift 往数组最前面添加

      // 如果长度 > 3 说明超出长度范围, 需要将最后的图片移除
      if ( picArr.length > 3 ) {
        // 删除数组的最后一项
        picArr.pop();
        // 删除最后一张图片
        // $('#imgBox img:last-child')  // 找最后一个孩子, 再判断是不是 img 类型
        // $('#imgBox img:last-of-type');  // 找到最后一个img类型的元素, 让他自杀
        // $('#imgBox img').eq( $('#imgBox img').length-1 )
        $('#imgBox img:last-of-type').remove();
      }
      console.log(picArr);


      if ( picArr.length === 3 ) {
        // 说明当前图片已经上传满 3 张, 需要将 picStatus 校验状态改成 VALID
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }
    }
  });



  // 5. 配置表单校验
  $('#form').bootstrapValidator({
    // 配置排除项, 需要对隐藏域进行校验
    excluded: [],

    // 配置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验规则
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          //正则校验, 非零(1-9)
          // \d  0-9
          // *    表示0次或多次
          // +    表示1次或多次
          // ?    表示0次或一次
          // {m,n}
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输出商品尺码"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '必须是xx-xx的格式, xx是两位数字, 例如: 36-44'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });



  // 6. 注册表单校验成功事件, 阻止默认的提交, 通过 ajax提交
  $('#form').on("success.form.bv", function( e ) {
    e.preventDefault();

    var paramsStr = $('#form').serialize(); // 所有表单内容数据

    // 还需要拼接上图片地址和名称
    // paramsStr += "&key1=value1&key2=value2"
    paramsStr += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    paramsStr += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    paramsStr += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;

    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: paramsStr,
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 添加成功
          // 关闭模态框
          $('#addModal').modal("hide");
          // 页面重新渲染第一页
          currentPage = 1;
          render();

          // 重置所有的表单内容和状态
          $('#form').data("bootstrapValidator").resetForm(true);

          // 由于下拉菜单  和  图片 不是表单元素, 需要手动重置
          $('#dropdownText').text("请选择二级分类");

          // 删除图片的同时, 清空数组
          $('#imgBox img').remove();
          picArr = [];
        }
      }
    })
  })



})