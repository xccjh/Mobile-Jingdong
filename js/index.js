window.onload = function() {
	searchEffect();
	timeBack();
	bannerEffect();
}
// 头部js代码
function searchEffect() {
	function getScroll() {
        return {
            top: window.pageYOffset || document.documentElement.scrolltop || document.body.scrolltop || 0,
            left: window.pageXOffset || document.documentElement.scrollleft || document.body.scrollleft || 0,
        };
    };
    var banner = document.querySelector(".jd_banner");
    var bannerHeight = banner.offsetHeight;
    var search = document.querySelector(".jd_search");
    window.onscroll = function() {
        var offsetTop = getScroll().top;
        var opacity = 0;
        if(offsetTop<bannerHeight) {
       		 opacity = offsetTop/bannerHeight;
       		 search.style.backgroundColor = "rgba(233,35,34,"+opacity +")";
        }
    }
}
//倒计时效果
function timeBack() {
	var span = document.querySelector(".jd_sk_time").querySelectorAll("span");
	var totalTime=3700;
	var timeId = setInterval(function() {
		totalTime--;
		if (totalTime < 0) {
			clearInterval(timeId);
			return;
		}
		var hour=Math.floor(totalTime/3600);
		var minute=Math.floor(totalTime%3600/60);
		var second=Math.floor(totalTime%60);
		span[0].innerHTML=Math.floor(hour/10);
		span[1].innerHTML=Math.floor(hour%10);
		span[3].innerHTML=Math.floor(minute/10);
		span[4].innerHTML=Math.floor(minute%10);
		span[6].innerHTML=Math.floor(second/10);
		span[7].innerHTML=Math.floor(second%10);
	},1000);
}
//轮播图效果
function bannerEffect() {
	// 获取元素
	var banner = document.querySelector(".jd_banner");
	var imgBox=banner.querySelector("ul:first-of-type");
	var first=banner.querySelector("li:first-of-type");
	var last=banner.querySelector("li:last-of-type");
	// 添加元素
	imgBox.appendChild(first.cloneNode(true));
	imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);
	//动态设置ul,li和初始偏移
	var lis= imgBox.querySelectorAll("li");
	var count =lis.length;
	console.log(count);
	var bannerWidth=banner.offsetWidth;
	imgBox.style.width = count*bannerWidth+"px";
	for (var i = 0; i < lis.length; i++) {
		lis[i].style.width = bannerWidth+"px";
	}
	//添加索引以计算轮播宽度
	var index=1;
	imgBox.style.left = -index*bannerWidth+'px';
	// 改变窗口大小重新刷新
	window.onresize= function() {
		bannerWidth=banner.offsetWidth;
		imgBox.style.width = count*bannerWidth+"px";
		for (var i = 0; i < lis.length; i++) {
			lis[i].style.width = bannerWidth+"px";
		}
		imgBox.style.left = (-index*bannerWidth)+'px';
	}
	var setIndicator = function(index) {
		var indicators=banner.querySelector("ul:last-of-type").querySelectorAll("li");
		for (var i = 0; i < indicators.length; i++) {
			indicators[i].classList.remove("active");
		}
		indicators[index-1].classList.add("active");
	}
	var timeId;
	// 自动轮播
	function startTime() {
		timeId=setInterval(function() {
		index++;
		imgBox.style.transition = 'left 0.5s ease-in-out';
		imgBox.style.left = (-index*bannerWidth)+"px";
		setTimeout(function() {
			if (index==count-1) {
				// console.log(index);
			index=1;
			imgBox.style.transition="none";
			imgBox.style.left = (-index*bannerWidth)+"px";
		}
		},500);
	},1000);
	}
	startTime();
	// 触摸滑动轮播
	var startX,moveX,distanceX;
	var isEnd=true;
	imgBox.addEventListener("touchstart",function(e) {
			clearInterval(timeId);
			// console.log('2222222');
			if (index==count-1) {
			index=1;
			// console.log('11111111');
			imgBox.style.transition="none";
			imgBox.style.left = (-index*bannerWidth)+"px";
		}
    		startX= e.targetTouches[0].clientX;

    	})
    imgBox.addEventListener("touchmove",function(e) {
    	if (isEnd==true) {
    		clearInterval(timeId);
    		moveX=e.targetTouches[0].clientX;
    		distanceX=moveX-startX;
    		imgBox.style.transition="none";
    		imgBox.style.left=-index*bannerWidth+distanceX+"px";
    	}
    })
    imgBox.addEventListener("touchend",function(e) {
    	isEnd=false;
    	if (Math.abs(distanceX)>100) {
    		if (distanceX>0) {
    			index--;
    		}else {
    			index++;
    		}
    		imgBox.style.transition = 'left 0.5s ease-in-out';
    		imgBox.style.left = -index*bannerWidth+"px";
    	}else if(Math.abs(distanceX) > 0) {
    		imgBox.style.transition = 'left 0.5s ease-in-out';
    		imgBox.style.left = -index*bannerWidth+"px";
    	}
    	startX=0;
    	moveX=0;
    	distanceX=0;
    	startTime();
    })
    imgBox.addEventListener("webkitTransitionEnd",function() {
     	if (index==count-1) {
     		index==1;
     		imgBox.style.transition="none";
     		imgBox.style.left = -index*bannerWidth+"px";
     	}else if(index==0) {
     		index=count-2;
     		imgBox.style.transition="none";
     		imgBox.style.left = -index*bannerWidth+"px";
     	}
     	setIndicator(index);
     	setTimeout(function() {
     		isEnd=true;
     	},500);
     })
}