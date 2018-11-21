/**
 * Created by 54721 on 2018/11/21.
 */
$(function() {

  // 左侧柱状图
  // 基于准备好的dom，初始化echarts实例
  var echarts_left = echarts.init(document.querySelector(".echarts_left"));

  // 指定图表的配置项和数据
  var option1 = {
    // 大标题
    title: {
      // 标题文本
      text: '2018年注册人数'
    },
    // 提示框组件
    tooltip: {},
    // 图例
    legend: {
      data:['人数', '销量']
    },
    // x轴
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    // y轴
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',   // bar 表示柱状图  line 表示折线图  pie 饼图
      data: [405, 500, 606, 700, 305, 500]
    },{
      name: '销量',
      type: "bar",
      data: [500, 200, 360, 120, 300, 400]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_left.setOption(option1);





  // 右侧饼图
  // 基于准备好的dom，初始化echarts实例
  var echarts_right = echarts.init(document.querySelector(".echarts_right"));

  // 指定图表的配置项和数据
  var option2 = {
    // 大标题
    title : {
      text: '热门品牌销售',
      // 副标题文本
      subtext: '2018年11月',
      // 控制水平方向的位置
      x:'center',
      textStyle: {
        fontSize: 25,   // 字体大小
        color: "#e92322"  // 字体颜色
      }
    },
    // 提示框组件
    tooltip : {
      trigger: 'item',   // 表示鼠标悬停在 item 上时触发
      // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 图例
    legend: {
      // vertical 垂直排列,  horizontal 水平
      orient: 'vertical',
      // 控制水平位置
      left: 'left',
      data: ['耐克','阿迪','阿迪王','老北京','老太太']
    },
    // 系列列表
    series : [
      {
        name: '热门品牌',   // 系列名称
        type: 'pie',   // 饼图
        // 控制圆的大小, 直径的大小
        radius : '55%',
        // 圆心的坐标
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'阿迪王'},
          {value:135, name:'老北京'},
          {value:1548, name:'老太太'}
        ],
        // 控制额外的阴影效果
        itemStyle: {
          emphasis: {
            shadowBlur: 100,
            shadowOffsetX: 0,
            shadowColor: 'yellow'
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_right.setOption(option2);


})
