!function(t,i){function o(){this.audio=new Audio,this.status="pause"}o.prototype={play:function(){this.audio.play(),this.status="play"},pause:function(){this.audio.pause(),this.status="pause"},getAudio:function(t){this.audio.src=t,this.audio.load()},playto:function(t){this.audio.currentTime=t,this.play()}},i.audioControl=o}(window.Zepto,window.player);