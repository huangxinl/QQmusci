(function($,root){
	function controlManager(len){
		this.len = len;
		this.index = index; 
	}
	controlManager.prototype = {
	    prev:function(){
      	return this.requireIndex(-1)
      },
      next: function(){
      	return this.requireIndex(1)
      },
      requireIndex: function(val){
      	  var index = this.index;
      	  var len = this.len;
      	  var  CurIndex =( len + index +val) % len;//在按下pre,or next后的下一页页码反馈
          this.index = CurIndex;
          return CurIndex;


      }
    
	}
     root.controlManager = controlManager;
})(window.Zepto,window.player || (window.player = {}))