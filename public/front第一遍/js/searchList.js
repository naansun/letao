$(function() {
  //获取地址栏参数：
  var value = getSearch("key");
  console.log(value);
  // 将地址栏参数赋值给搜索框
  $(".search-input").val(value);

  // 已进入页面就渲染
  render();

  // 点击搜索按钮搜索
  $(".btn-search").click(function() {
    render();
  });

  // 功能二：点击排序按钮  实现高亮效果
  //如果没有current类  添加上current类
  //如果有current类  切换箭头的方向
  $(".lt_sort ul a").click(function() {
    //如果有current类
    if ($(this).hasClass("current")) {
      $(this)
        .find("i")
        .toggleClass("fa-angle-down")
        .toggleClass("fa-angle-up");
    }
    // 如果没有current类
    else {
      //排除他人
      $(".lt_sort ul a").removeClass("current");
      //添加自己
      $(this).addClass("current");
    }
    render();
  });

  function render() {
    $(".lt_product ul").html('<div class="loading"></div>');
    //根据获取的文字发送ajax请求
    var fields = {};
    fields.proName = $(".search-input").val();
    fields.page = 1;
    fields.pageSize = 100;
    // console.log(fields);
    var $current = $(".lt_sort ul a.current");
    // 如果有高亮的a
    if ($current.length === 1) {
      var sortName = $current.data("type");
      // console.log(sortName);
      var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;
      fields[sortName] = sortValue;
      // console.log(fields);
    }
    setTimeout(function() {
      $.ajax({
        type: "get",
        url: "/product/queryProduct",
        data: fields,
        dataType: "json",
        success: function(info) {
          console.log(info);
          var htmlStr = template("searchList", info);
          $(".lt_product ul").html(htmlStr);
        }
      });
    }, 1000);
  }
});
