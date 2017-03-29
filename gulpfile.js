var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync");
var rename = require('gulp-rename');
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');
var imagemin = require('gulp-imagemin');

gulp.task('style', function() {
	gulp.src('less/style.less')
		.pipe(plumber())
		.pipe(less())
		.pipe(postcss([
			autoprefixer({browsers: [
				"last 1 version",
				"last 2 Chrome version",
				"last 2 Firefox version",
				"last 2 Opera version",
				"last 2 Edge version"
			]}),
			mqpacker({
				sort: true
			})
		]))
		.pipe(gulp.dest('css'))
		
		//.pipe(server.reload({stream: true}));
});

gulp.task('server', ["style"], function() {
	server.init({
		server: '.'
	});

	gulp.watch('less/**/*.less', ['style']);
	gulp.watch('*.html')
		.on('change', server.reload);
	gulp.watch('js/**/*.js')
		.on('change', server.reload);

});

gulp.task('stylemin', function() {
	gulp.src('less/style.less')
		.pipe(plumber())
		.pipe(less())
		.pipe(postcss([
			autoprefixer({browsers: [
				"last 1 version",
				"last 2 Chrome version",
				"last 2 Firefox version",
				"last 2 Opera version",
				"last 2 Edge version"
			]}),
			mqpacker({
				sort: true
			})
		]))
		.pipe(gulp.dest('css'))
		.pipe(minify())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('css'));
});

gulp.task('images', function(){
	return gulp.src('img/**/*.{png,jpg,gif}')
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({prograssive: true})
		]))
		.pipe(gulp.dest('img'));
});