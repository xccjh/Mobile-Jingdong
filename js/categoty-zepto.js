	// window.onload=function() {
		var ct_left= document.querySelector(".ct_left");
		var leftHeight=ct_left.offsetHeight;
		console.log(leftHeight);
		var ulBox= ct_left.querySelector("ul:first-of-type");
		var lis =ulBox.querySelectorAll("li");
		// console.log(lis);
		var ulBoxHeight=ulBox.offsetHeight;
		console.log(ulBoxHeight);
		var maxTop=0;
		var minTop=leftHeight-ulBoxHeight;
		console.log(minTop);
		var maxBounceTop=maxTop+100;
		var minBounceTop=minTop-100;
		var startY=0;
		var moveY=0;
		var distanceY=0;
		var currentY=0;
		ulBox.addEventListener('touchstart',function(e) {
			startY= e.targetTouches[0].clientY;
			console.dir(startY);
		});
		ulBox.addEventListener('touchmove',function(e) {
			moveY= e.targetTouches[0].clientY;
			distanceY=moveY-startY;
			console.log(distanceY);
			if (currentY+distanceY > maxBounceTop || currentY+distanceY<minBounceTop) {
				return;
			}
			ulBox.style.transition = 'none';
			ulBox.style.top = (currentY+distanceY)+"px";
			console.log(currentY+distanceY);
		});
		ulBox.addEventListener("touchend",function(e) {
			if (currentY+distanceY < minTop) {
				currentY=minTop;
				ulBox.style.transition = 'top 0.5s ease-in-out';
				ulBox.style.top=minTop+"px";
			}else if (currentY+distanceY>maxTop) {
				currentY=maxTop;
				ulBox.style.transition="top 0.5s ease-in-out";
				ulBox.style.top=maxTop+"px";
			}else {
			currentY+=distanceY;
			}
		});
		for (var i = 0; i < lis.length; i++) {
			// lis[i].setAttribute("index",i);
			lis[i].index=i;
		}
		// myTap.tap(ulBox,function(e) {
		// 	for (var i = 0; i < lis.length; i++) {
		// 		lis[i].classList.remove("active");
		// 	}
		// 	var li = e.target.parentNode;
		// 	var liHeight= li.offsetHeight;
		// 	console.log(liHeight);
		// 	li.classList.add("active");
		// 	var index=li.index;
		// 	ulBox.style.transition = 'top 0.5s ease-in-out';
		// 	console.log(minTop);
		// 	console.log(-index*liHeight);
		// 	ulBox.style.top = -index*liHeight+"px";
		// 	if (-index*liHeight < minTop) {
		// 		console.log('11111');
		// 		ulBox.style.top = minTop+"px";
		// 		currentY=minTop;
		// 	}else {
		// 		ulBox.style.top = -index*liHeight+"px";
		// 		currentY=-index*liHeight;
		// 	}
		// })
	// }
	// $(ulBox).on("tap", function(e) {
	// 		console.log('111111111111111111111111');
	// 		for (var i = 0; i < lis.length; i++) {
	// 			lis[i].classList.remove("active");
	// 		}
	// 		var li = e.target.parentNode;
	// 		var liHeight= li.offsetHeight;
	// 		console.log(liHeight);
	// 		li.classList.add("active");
	// 		var index=li.index;
	// 		ulBox.style.transition = 'top 0.5s ease-in-out';
	// 		console.log(minTop);
	// 		console.log(-index*liHeight);
	// 		ulBox.style.top = -index*liHeight+"px";
	// 		if (-index*liHeight < minTop) {
	// 			console.log('11111');
	// 			ulBox.style.top = minTop+"px";
	// 			currentY=minTop;
	// 		}else {
	// 			ulBox.style.top = -index*liHeight+"px";
	// 			currentY=-index*liHeight;
	// 		}
	// 		})
	if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }
    ulBox.addEventListener("click",function(e) {
			for (var i = 0; i < lis.length; i++) {
				lis[i].classList.remove("active");
			}
			var li = e.target.parentNode;
			var liHeight= li.offsetHeight;
			console.log(liHeight);
			li.classList.add("active");
			var index=li.index;
			ulBox.style.transition = 'top 0.5s ease-in-out';
			console.log(minTop);
			console.log(-index*liHeight);
			ulBox.style.top = -index*liHeight+"px";
			if (-index*liHeight < minTop) {
				console.log('11111');
				ulBox.style.top = minTop+"px";
				currentY=minTop;
			}else {
				ulBox.style.top = -index*liHeight+"px";
				currentY=-index*liHeight;
			}
    });
