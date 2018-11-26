(function($,root){
	var $scope = $(document.body);
	function renderInfor(infor){
		var html = '<div class="song">'+infor.singer+'</div>'
			+'<div class="author">'+infor.song+'</div>'+
			'<div class="zhuanji">'+infor.album+'</div>';
			$scope.find(".wrapper-con").html(html); 
	}
	function renderImg(src){
		var img = new Image();
		img.src = src;
		img.onload = function(){
			root.blurImg(img, $scope);
			$scope.find(".song-img img").attr("src",src)
		}
	}
	function orlike(islike){
		if(islike)
		{
			$scope.find(".like").addClass("liking");
		}else
		{
			$scope.find(".like").removeClass("liking");
		}

	}
	root.render = function(data){
		renderInfor(data);
		renderImg(data.images);
		orlike(data.islike)
	}

})(window.Zepto, window.player ||(window.player= {}) );