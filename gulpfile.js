var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('default', ['watch']);

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: ''
		},
	})
})

gulp.task('watch', ['browserSync'], function(){
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('css/**/*.css', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
})