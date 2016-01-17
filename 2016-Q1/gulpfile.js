var gulp = require("gulp");
var ts = require("gulp-typescript");
var coffee = require("gulp-coffee");
var server = require( 'gulp-nodemon' );
var browserSync = require('browser-sync').create();

var BROWSER_RELOAD_DELAY = 2000;

gulp.task("default",["browser:sync"],function(){
	gulp.watch("./server/**/*.coffee",["compile:coffee"]);		
});

gulp.task("browser:sync",["server:start"],function(){
	browserSync.init(null,{
			proxy: "http://localhost:4000",
			port: 7000
	});
});

gulp.task("server:start",function(cb){
	var run_flag = false;
	return server({
		script:"./deploy/server/index.js",
		watch:["./deploy/server"],
		ext: 'js'
	}).on("start",function(){
		if (!run_flag){
			cb();
		};
		run_flag = true;
	}).on("restart",function(){
		console.log("restart");
		setTimeout(function reload(){
			console.log("reload");
			browserSync.reload({
				stream:true
			});
		},BROWSER_RELOAD_DELAY);
	});
});

// compile typescript
gulp.task("compile:ts",function(){
	return gulp.src(["./server/**/*.ts"])
		.pipe(ts({module:"commonjs"}))
		.js.pipe(gulp.dest("./deploy/server"));
});

// compile coffeescript
gulp.task("compile:coffee",function(){
	return gulp.src(["./server/**/*.coffee"])
		.pipe(coffee())
		.pipe(gulp.dest("./deploy/server"))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task("deploy:static",function(){
	return gulp.src(["server/views/*"])
				.pipe(gulp.dest("deploy/server/views"))
});

