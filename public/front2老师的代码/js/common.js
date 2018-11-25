/**
 * Created by 54721 on 2018/11/24.
 */

// 进行 scroll 区域滚动初始化
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false
});


// 获得slider插件对象, 进行轮播图配置
var gallery = mui('.mui-slider');
gallery.slider({
  interval: 4000 //自动轮播周期，若为0则不自动播放，默认为0；
});
