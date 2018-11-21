$(function () {
    //实现数据可视化的具体操作
    var myChart1 = echarts.init(document.querySelector('.echarts_left'));
    // 指定图表的配置项和数据
    var option = {
        // 标题
        title: {
            text: '2018年注册人数',
            textStyle: {
                color: '#D48265',
                fontSize: 25
            },
        },
        // 小内容区域
        tooltip: {},
        legend: {
            data: ['销量', '利润'],
            top: '30px',
            right: '30px'
        },
        xAxis: {
            data: ["一月", "二月", "三月", "四月", "五月", "六月"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 60, 136, 50, 60, 20]
        }, {
            name: '利润',
            type: 'bar',
            data: [25, 100, 180, 30, 80, 100]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option);




    //右侧的饼图制作
    var myChart2 = echarts.init(document.querySelector('.echarts_right'));
    option = {
        title: {
            text: '热门品牌销售',
            subtext: '2018年11月',
            x: 'center',
            textStyle: {
                color: '#D48265',
                fontSize: 25
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '回力', '阿迪达斯', '贵人鸟', '椰子']
        },
        series: [{
            name: '所占比例',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{
                    value: 320,
                    name: '耐克'
                },
                {
                    value: 310,
                    name: '回力'
                },
                {
                    value: 234,
                    name: '阿迪达斯'
                },
                {
                    value: 135,
                    name: '贵人鸟'
                },
                {
                    value: 648,
                    name: '椰子'
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    myChart2.setOption(option);
})