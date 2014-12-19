var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var mincss =  require("gulp-minify-css");

// default to the lot
gulp.task("default", ["sass","js"], function() {});


// compile sass
gulp.task("sass", function() {
	return gulp.src("sass/*.scss")
		.pipe( sass({errLogToConsole: true}) )
		.pipe( mincss() )
		.pipe( gulp.dest("public/css/") );
});

// compile js
gulp.task("js", function() {
	return gulp.src("js/*.js")
		.pipe( uglify() )
		.pipe( gulp.dest("public/js/") );
});


// watch
gulp.task( "watch", function() {
	gulp.watch( "js/*.js", ["js"] );
	gulp.watch( "sass/*.scss", ["sass"] );
});