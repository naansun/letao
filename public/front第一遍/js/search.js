// 假设存在这样的数组  模仿本地存储数据操作

// var arr = ['随风', '阿迪', '回力', '匡威', '耐克', '椰子', '贵人鸟'];
// // 往localStorage中存数据
// //JSON.stringify()  将对象转换成json格式的字符串
// var jsonStr = JSON.stringify(arr);
// localStorage.setItem('search_list', jsonStr);



$(function () {
    render();
    //功能一：本地历史记录渲染展示
    //取数据
    function getHistory() {
        var jsonStr = localStorage.getItem('search_list') || "[]";
        //将取出的json格式的字符串转换成数组
        var arr = JSON.parse(jsonStr);
        return arr;
    }
    // 取出数据后  动态渲染
    function render() {
        var arr = getHistory();
        var htmlStr = template('search', {
            data: arr
        });
        $('.lt_content').html(htmlStr);
        // console.log({
        //     data: arr
        // });
    }



    // 功能二：清空所有的历史记录
    //因为是动态渲染的  因此需要使用事件委托
    $('.lt_content').on('click', '.btn-del', function () {
        mui.confirm('你确定要清空历史记录嘛？', '温馨提示', ['取消', '确认'], function (e) {
            // console.log(e);
            // 说明点击的是确认按钮
            if (e.index === 1) {
                localStorage.removeItem('search_list');
                render();

            }

        })

    });
    //功能三：删除单条数据
    //同样使用事件委托
    $('.lt_content').on('click', '.btn-out', function () {
        var index = $(this).data('index');
        // console.log(index);
        // 取出数组  对数组进行操作
        var arr = getHistory();
        // console.log(arr);
        arr.splice(index, 1);
        // console.log(arr);
        // 将修改的数组重新传到本地数据库中
        localStorage.setItem('search_list', JSON.stringify(arr));
        // 重新渲染
        render();

    });


    // 功能四：添加历史记录功能
    //添加点击事件
    $('.btn-search').click(function () {
        var key = $('.search-input').val().trim();
        if (key === '') {
            // 提示
            mui.toast('请输入搜索内容');
            return;
        }
        // 取出数组
        var arr = getHistory();

        // 注意两个问题：一是数组的重复项问题 二是数组的长度问题
        var index = arr.indexOf(key);
        if (index != -1) {
            //说明  数组中已经存在  key字符串
            // 删除该重复项  
            arr.splice(index, 1);

        }
        if (arr.length >= 10) {
            //将数组的最后一项删除
            arr.pop();
        }
        // 往数组头部添加内容
        arr.unshift(key);
        // 存
        localStorage.setItem('search_list', JSON.stringify(arr));
        // 重新渲染
        render();

        $('.search-input').val('');
        location.href = 'searchList.html?key=' + key + '';

    })






})