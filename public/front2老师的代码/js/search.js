/**
 * Created by 54721 on 2018/11/25.
 */

/*
* 由于整个页面都在进行本地历史记录的操作, 所以约定键名: search_list
*
  以下 3 行代码, 用于在控制台执行, 添加假数据
  var arr = ["耐克", "啊迪", "阿迪王", "耐克王", "老奶奶", "老北京"];
  var jsonStr = JSON.stringify( arr );
  localStorage.setItem( "search_list", jsonStr );
* */


/*
* 功能分析
* 功能1: 本地历史记录渲染展示
* 功能2: 清空所有历史记录
* 功能3: 删除单条历史记录
* 功能4: 添加搜索历史
* */

$(function() {

  /*
  * 功能1: 本地历史记录渲染展示
  * 思路:
  *   (1) 从本地读取搜索历史
  *   (2) 读出来的是 jsonStr, 转换成数组
  *   (3) 结合模板引擎渲染
  * */
  render();


  // 获取本地历史记录数组
  function getHistory() {
    // 对没有数据时, 进行默认值处理
    var jsonStr = localStorage.getItem( "search_list" ) || '[]';
    var arr = JSON.parse( jsonStr ); // 将jsonStr转成数组
    return arr;
  }

  // 读取本地历史数组, 并根据数组进行渲染
  function render() {
    var arr = getHistory();
    // 结合模板引擎渲染
    var htmlStr = template( "searchTpl", { list: arr } );
    $('.lt_history').html( htmlStr );
  }



  /*
  * 功能2: 清空所有历史记录
  * 思路:
  *   (1) 给清空记录添加点击事件 (事件委托注册)
  *   (2) 利用removeItem清空所有的历史记录
  *   (3) 重新渲染页面
  * */
  $('.lt_history').on("click", ".btn_empty", function() {

    // 参数1: 确认框文本内容
    // 参数2: 大标题
    // 参数3: 按钮文本的数组
    // 参数4: 关闭模态框调用的回调函数
    mui.confirm("你确定要清空历史记录嘛?", "温馨提示", ["取消", "确认"], function( e ) {
      // 通过 e.index 标记点击按钮对应的 下标
      if ( e.index === 1 ) {
        // 确认按钮被点击
        // 移除本地历史
        localStorage.removeItem( "search_list" );
        // 重新渲染页面
        render();
      }
    })


  });


  /*
  * 功能3: 删除单条历史记录
  * 思路:
  *   (1) 给所有的删除按钮, 添加点击事件 (事件委托)
  *   (2) 获取存储的下标, 将数组的对应项删除
  *   (3) 将数组转成jsonStr, 存储到本地存储中
  *   (4) 重新渲染
  * */
  $('.lt_history').on("click", '.btn_delete', function() {
    // 获取下标
    var index = $(this).data("index");

    // 获取数组
    var arr = getHistory();

    // 根据下标, 删除数组的对应项
    // splice 特征: 会改变原数组
    // arr.splice(从哪开始, 删除几个, 替换的项1, 替换的项2, ..... );
    arr.splice( index, 1 );

    // 转成jsonStr, 存入本地存储
    localStorage.setItem( "search_list", JSON.stringify(arr) );

    // 重新渲染
    render();
  });


  /*
  * 功能4: 添加历史记录功能
  * 思路:
  *   (1) 给搜索按钮, 添加点击事件
  *   (2) 获取搜索关键字, 添加到数组的最前面 (unshift)
  *   (3) 将数组转成jsonStr, 存储到本地存储中
  *   (4) 重新渲染
  * */
  $('.search_btn').click(function() {
    // 获取搜索关键字
    var key = $('.search_input').val().trim();

    // 非空处理
    if ( key === "" ) {
      // 提示请输入搜索关键字
      mui.toast("请输入搜索关键字");
      return;
    }

    // 获取数组
    var arr = getHistory();

    // 1. 如果已经有了重复项, 需要将重复项删除
    var index = arr.indexOf( key );
    if ( index != -1 ) {
      // 有重复项, 将重复项删除  splice(从哪开始, 删几个, 替换的项1, 替换的项2, .... );
      arr.splice( index, 1 );
    }
    // 2. 如果长度超过 10 个, 需要删除最后一个
    if ( arr.length >= 10 ) {
      arr.pop();
    }

    // 往数组最前面追加
    arr.unshift( key );

    // 转成 json, 存到本地
    localStorage.setItem( "search_list", JSON.stringify(arr) );

    // 重新渲染
    render();

    // 清空搜索框内容
    $('.search_input').val("");

    // 跳转到商品列表页
    location.href = "search_list.html?key=" + key;
  })


})
