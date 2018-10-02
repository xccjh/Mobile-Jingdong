window.onload = function() {
	searchEffect();
	timeBack();
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