var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);

var index = 0;
var songList;
var audio = new root.audioControl();


function bindEvent(){
	//切歌曲
	$scope.on("play:change",function (event,index){
		console.log(controlManager)//每次切歌会打印Curindex
		audio.getAudio(songList[index].audio); 
		console.log(songList[index].audio)
		if(audio.status == "play"){
			audio.play();
			root.process.start();//播放情况下，重新开始播放(stopPer=0),将所得percent传入update()，渲染进度条
		}
		root.render(songList[index]);
		root.process.renderAlltime(songList[index].duration);//渲染总时间
		root.process.update(0);//暂停情况下，传入percent为0，transitionX(-100%)进度条为0;
	})

  //前进按钮
    $scope.on("click",".prev",function(){
    	// index--;
    	var index = controlManager.prev();
    	 $scope.trigger("play:change",index); 
    	console.log(index)
  
    })
    //后退按钮
       $scope.on("click",".next",function(){
    	// index++;
   		var index = controlManager.next();
   			$scope.trigger("play:change",index); 
    })
     //播放按钮
       	$scope.on("click",".play",function(){
		if(audio.status == "play"){
			audio.pause();
					root.process.stop();

		}else{
			audio.play();	
					root.process.start();	
		}

		$(this).toggleClass("pause")
	})
}


function bindTouch(){

		var $circle = $scope.find('.circle');
		var offset = $scope.find('.cover').offset();
		var left = offset.left;	//cover距离document宽度
		var width = offset.width;//cover自身宽度
		//$scope.find(".song-img img").offset()  例子分析
		$circle.on('touchstart',function(){
			root.process.stop();
		}).on('touchmove',function(e){
			var x = e.changedTouches[0].clientX;//事件属性返回当事件被触发时鼠标指针向对于浏览器页面（或客户区）的水平坐标
			var per = (x -left) /width;
			// console.log(x)
			// console.log(per)
			if(per<0 || per>1){
				per=0;
			}
			root.process.update(per);
		}).on('touchend',function(e){
			console.log(555)
			var x = e.changedTouches[0].clientX;
			var per = (x -left) /width;
			if(per<0 || per>1){
				per=0;
			}
			
			var curDuration = songList[controlManager.index].duration;
			var curTime = per * curDuration;
			audio.playto(curTime);
			root.process.start(per);
			$scope.find('.play').addClass('pause');
		})	
}
//window.Zepto 获取数据 ajax
function getData(url){
	$.ajax({
		type:"GET",
		url:url,
		success:function(data){
			root.render(data[0]);
			songList = data;
			console.log(data)
			bindEvent();


		    controlManager = new root.controlManager(data.length);//传入len
		    $scope.trigger("play:change",0);
		    bindTouch();

		},
		error:function(){
			console.log('error');
		}
	})
}


getData("../mock/data.json");//mock文件夹 存放data.json