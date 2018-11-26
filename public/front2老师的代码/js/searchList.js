/**
 * Created by 54721 on 2018/11/25.
 */

$(function() {

  // 1. 获取地址栏传递的搜索关键字
  var key = getSearch("key");
  console.log( key );

  // 2. 赋值给 input 搜索框
  $('.search_input').val( key );

  // 3. 根据搜索关键字, 发送ajax请求, 获取数据, 进行渲染
  render();


  // 4. 点击搜索按钮的时候, 重新发送请求
  $('.search_btn').click(function() {
    render();
  });


  // 5. 点击排序的按钮, 实现高亮效果
  // (1) 如果当前 a 没有 current 类, 添加上 current 类, 其他人的去掉
  // (2) 如果当前 a 有 current 类, 切换箭头的方向 (切换类)
  $('.lt_sort a[data-type]').click(function() {

    if ( $(this).hasClass("current") ) {
      // 有 current 类, 切换箭头的方向, fa-angle-down  fa-angle-up
      $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }
    else {
      // 没有 current 类
      $(this).addClass("current").siblings().removeClass("current");
    }

    // 调用 render 方法重新渲染
    render();
  })




  function render() {
    // 在发送请求, 重新渲染前, 由于请求是需要时间的, 所以这时候应该显示加载中的效果
    $('.lt_product').html('<div class="loading"></div>');

    var paramsObj = {};

    // 这是三个必传的参数
    paramsObj.proName = $('.search_input').val();
    paramsObj.page = 1;
    paramsObj.pageSize = 100;

    // 根据是否有高亮的 a 决定是否需要排序
    // 额外的两个可传的参数
    var $current = $('.lt_sort a.current');

    if ( $current.length === 1 ) {
      // 有高亮的 a, 需要排序, 从自定义属性中获取需要传递的参数
      var sortName = $current.data("type");   // price  /  num

      // 通过判断箭头的方向(类名), 来决定排序的值  1升序，2降序
      // 下箭头 ? 降序2 : 升序1
      var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;

      // 添加到 paramsObj 参数中
      paramsObj[ sortName ] = sortValue;
    }

    setTimeout(function() {
      $.ajax({
        type: "get",
        url: "/product/queryProduct",
        data: paramsObj,
        dataType: "json",
        success: function( info ) {
          console.log( info );
          var htmlStr = template("searchTpl", info);
          $('.lt_product').html( htmlStr );
        }
      })
    }, 500);
  }


})