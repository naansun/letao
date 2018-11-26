// mui实现区域滚动
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false,
});

// 轮播图区域
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
    interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
});




//从地址栏中拿取拼接的字符串:
function getSearch(k) {
    // 获取地址栏参数
    var str = location.search;
    // 解码成中文, 将地址栏编码后的中文, 进行解码
    str = decodeURI(str);
    // 去掉第一个问号
    // str.slice(start, end)
    // 从start开始, 到end结束,  包含start,不包含end
    // end如果不写, 默认截取到最后
    str = str.slice(1);
    var arr = str.split('=');
    var obj = {};
    obj[arr[0]] = arr[1];
    return obj[k];

}