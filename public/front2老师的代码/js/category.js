/**
 * Created by 54721 on 2018/11/25.
 */
$(function() {

  // 1. 一进入页面, 发送请求, 获取一级分类数据, 渲染左侧
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function( info ) {
      console.log( info );
      var htmlStr = template("leftTpl", info);
      $('.lt_category_left ul').html( htmlStr );

      // 默认渲染第一条, 对应的二级分类
      renderById( info.rows[0].id )
    }
  });


  // 给左侧所有的 a 添加点击事件 (通过事件委托)
  $('.lt_category_left').on("click", "a", function() {

    // 给自己加, 还需要排他
    $('.lt_category_left a').removeClass("current");
    $(this).addClass("current");

    // 获取 id, 调用方法, 渲染二级分类
    var id = $(this).data("id");
    renderById( id );
  })


  // 根据一级分类id, 动态渲染右侧二级分类
  function renderById( id ) {

    // 根据 id 发送 ajax 请求
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template( "rightTpl", info );
        $('.lt_category_right ul').html( htmlStr );
      }
    })

  }

})
