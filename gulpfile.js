var gulp = require('gulp');
var htmlclean =require("gulp-htmlclean");
var imgMin = require('gulp-imagemin');
var uglify =  require("gulp-uglify");  //js代码压缩
var strip =  require("gulp-strip-debug"); //去调试代码
var concat = require("gulp-concat");//js文件进行拼接
var less = require("gulp-less");// css for gulp
var postcss = require("gulp-postcss");//postcss方法是使用postcss将插件做成数组传入
var autoprefixer = require("autoprefixer"); //添加前缀
var cssnano = require("cssnano"); //压缩代码
var connect = require("gulp-connect");//开启本地服务器
var devMode = process.env.NODE_ENV == "development";//开发者模式 export NODE_ENV="development"
console.log(devMode)
var folder = { 
	src: "src/",
	dist: "dist/",
}

gulp.task("html",function(){
	var Page = gulp.src(folder.src + "html/*") //取文件
	    .pipe(connect.reload())
	if(!devMode){
		Page.pipe(htmlclean())
	}

	  Page.pipe(gulp.dest(folder.dist + "html/"))
})

gulp.task("images",function(){
	gulp.src(folder.src + 'images/*')
	 .pipe(imgMin())
	 .pipe(gulp.dest(folder.dist + 'images/'))
})

gulp.task("js",function(){
	var Page = gulp.src(folder.src + "js/*")
	      .pipe(connect.reload())
	    // .pipe(concat("main.js"))
	    if(!devMode){
	      Page.pipe(strip())
	          .pipe(uglify())
	    }
	
	    Page.pipe(gulp.dest(folder.dist + "js/"))
})


gulp.task("css",function(){
	  var options = [autoprefixer(),cssnano()];
	    var Page =  gulp.src(folder.src + "css/*")
	        .pipe(less())
	        .pipe(connect.reload())
	    if(!devMode){	       
	          Page.pipe(postcss(options))
	      }
         	  Page.pipe(gulp.dest(folder.dist + "css/"))
})

gulp.task("watch",function(){
	gulp.watch(folder.src + "html/*",['html'])
	gulp.watch(folder.src + "js/*",['js'])
	gulp.watch(folder.src + "css/*",['css'])
})

gulp.task("server",function(){
	connect.server({
		port:8090,
		livereload:true
	});

})


gulp.task("default",["html","images","js","css","watch","server"])