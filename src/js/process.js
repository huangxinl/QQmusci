(function($,root){
	var curDuration;
	var scope = $(document.body);
	var startTime = startTime;
	var stopPer = 0;
	var frameId;
	//时间格式化
	function formatTime(time){
		time = Math.round(time);
		var minute = Math.floor(time/60);
		var second = Math.floor(time - minute*60);
		if(minute < 10 ){
			minute = '0' + minute;
		}
		if(second <10){
		    second = '0'+ second;
	    } 
	    return minute +":"+second;		
	}
	function renderAlltime(duration){
		stopPer = 0;//每次渲染，我都令StopPer的值为0
		curDuration = duration;
		var allTime = formatTime(duration);
		$scope.find(".end").html(allTime);
	}
	//if percent = 0; translateX(-100%);
	function update(percent){
	
		var curTime = percent*curDuration;
		curTime = formatTime(curTime);
		$scope.find(".init").html(curTime);
		//渲染进度条
		var percentage = (percent - 1)*100 +'%';
		$scope.find(".top").css({
			'transform': 'translateX('+percentage +')'
		})
		
	}
	//时间进度条改变
	function start(per){
		// stopPer = 0;
		stopPer = per === undefined ? stopPer : per;
		cancelAnimationFrame(frameId)
		startTime = new Date().getTime();
		function frame(){
			var curTime = new Date().getTime();
			var percent = stopPer + (curTime -startTime)/(curDuration*1000);
			frameId = requestAnimationFrame(frame);
			update(percent);
		}
		frame();
	

	}
	function stop(){
		var stopTime = new Date().getTime();
		stopPer =stopPer + (stopTime - startTime)/(curDuration*1000);
		cancelAnimationFrame(frameId);

	}
	root.process = {
		renderAlltime: renderAlltime,
		start:start,
		stop:stop,
		update:update


	}
})(window.Zepto,window.player || (window.player = {}))