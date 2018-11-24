/**
 * Created by 54721 on 2018/11/22.
 */
$(function() {

  var currentPage = 1; // 当前页
  var pageSize = 5; // 每页条数

  var currentId;  // 当前编辑的用户 id
  var isDelete; // 修改的状态

  // 1. 一进入页面, 发送ajax请求, 获取用户列表数据, 通过模板引擎渲染
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        // template( 模板id, 数据对象 )
        var htmlStr = template("tmp", info);
        $('tbody').html( htmlStr );

        // 根据后台返回的数据, 进行分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, // 版本号
          currentPage: info.page, // 当前页
          totalPages: Math.ceil( info.total / info.size ), // 总页数
          // 给页码添加点击事件
          onPageClicked: function( a, b, c, page ) {
            console.log( page );
            // 根据 page 重新请求数据, 进行渲染
            currentPage = page; // 更新当前页

            // 根据当前页, 重新渲染
            render();
          }
        })
      }
    });
  }

  // 分页插件测试
  //$('#paginator').bootstrapPaginator({
  //  bootstrapMajorVersion: 3, // 指定bootstrap版本号
  //  currentPage: 1, // 当前页
  //  totalPages: 3, // 总页数
  //  onPageClicked: function( a, b, c, page ) {
  //    console.log( page );
  //  }
  //})


  // 2. 点击启用禁用按钮, 显示模态框(事件委托)
  $('tbody').on("click", ".btn", function() {
    // 显示模态框
    $('#userModal').modal("show");

    // 获取用户 id
    currentId = $(this).parent().data("id");

    // 获取需要修改的状态, 根据按钮的类名来判断具体传什么
    // 禁用按钮 ? 0 : 1;
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  });

  // 3. 点击模态框确认按钮, 完成用户的启用禁用
  $('#submitBtn').click(function() {

    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: currentId, // 用户id
        isDelete: isDelete // 将用户改成什么状态, 1启用, 0禁用
      },
      dataType: "json",
      success: function( info ) {
        console.log( info )
        if ( info.success ) {
          // 关闭模态框
          $('#userModal').modal("hide");  // show hide
          // 重新渲染页面
          render();
        }
      }
    })

  })


})
