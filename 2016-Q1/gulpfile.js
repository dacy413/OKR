var gulp = require("gulp");
var ts = require("gulp-typescript");
var coffee = require("gulp-coffee");
var server = require( 'gulp-develop-server' );
var browserSync = require('browser-sync').create();

gulp.task("compile:ts",function(){
	console.log("compiling typescript...");
	return gulp.src(["./server/**/*.ts"])
		.pipe(ts({module:"commonjs"}))
		.js.pipe(gulp.dest("./deploy/server"));
});

gulp.task("compile:coffee",function(){
	console.log("compiling coffeescript...");
	return gulp.src(["./server/**/*.coffee"])
		.pipe(coffee())
		.pipe(gulp.dest("./deploy/server"))
});

gulp.task("reload:coffee",["compile:coffee"],function(){
	server.restart(function(error){
		console.log("call cb");
		browserSync.reload();
	});
});

gulp.task("start:server",function(){
	console.log("b");
	server.listen({path:"./deploy/server/index.js"},function(error){
		console.log("c");
		browserSync.init({
			proxy: "http://localhost:3000",
			files: ["./deploy/server/**/*.*"],
			port: 4000
		});
		console.log("browserSync",browserSync);
	});
});

gulp.task("restart:server",function(){
	server.restart();
});

gulp.task("reload",function(){
	console.log("call reload");
});

gulp.task("watch",function(){
	gulp.watch("./server/**/*.ts",["compile:ts","restart:server","reload"]);
});

gulp.task("default",["start:server"],function(){
	console.log("TEST");
	gulp.watch("./server/**/*.coffee",["reload:coffee"]);		
});