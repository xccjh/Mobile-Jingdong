var myTap = {
    // 添加单击事件
    tap:function(dom,callback){
        // 一个单击事件有那些特点？
        // 1.只有一根手指
        // 2.不能有滑动：允许有抖动，但是距离不能太大
        // 3.手指离开和手指触摸的时间差异不能太大，如不能超过300ms
        var startX = 0, startY = 0;
        var st = 0;

        // 使用touch来模拟单击操作--因为touch在移动端是优先响应的
        dom.addEventListener("touchstart",function(e){
            // 判断手指的数量
            if(e.targetTouches.length > 1){
                return;
            }
            // 记录开始触摸的时间
            // Date.now():获取从1970-1-1到当时时间的毫秒数 
            st = Date.now();
            // 记录手指的起始位置
            startX = e.targetTouches[0].clientX;
            startY = e.targetTouches[0].clientY;
        });
        dom.addEventListener("touchend",function(e){
            var disX = e.changedTouches[0].clientX - startX;
            var disY = e.changedTouches[0].clientY - startY;
            if(Math.abs(disX) >= 5 || Math.abs(disY) >= 5){
                return;
            }
            var et = Date.now();
            if(et - st > 200){
                return;
            }
            // 执行事件触发珠回调函数.,将事件源参数做为参数传递
            callback && callback(e);
        });
    }
};