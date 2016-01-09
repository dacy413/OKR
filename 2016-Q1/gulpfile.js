var gulp = require("gulp");
var ts = require("gulp-typescript");

gulp.task("compile",function(){
	console.log("compiling typescript...");
	return gulp.src(["server/**/*.ts"])
		.pipe(ts({module:"commonjs"}))
		.js.pipe(gulp.dest("./deploy/server"))
});