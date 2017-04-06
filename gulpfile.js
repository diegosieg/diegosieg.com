/**
 *
 *	GulpFile
 *
 *	@version	1.0.0
 *	@author		Diego Sieg
 *
 */


/** ------------------------------------------------------------
 *	AVAILABLE TASKS
    sass			: Compile SCSS to CSS and add autoprefixing and sourcemapping
    watch           : Runs the 'sass' task above with browser-sync
    serve           : Runs the 'watch' task above
    default         : Runs 'serve' task above
    imagemin        : Run image optimisation to save some valuable kb's
    htmlminify      : Run html minify
    build           : Run final build to production
 */

/** ------------------------------------------------------------
 *  OPTIONS
 */
var gulp            = require('gulp');
var gutil           = require('gulp-util');             // Some extra gulp utils
var sass            = require('gulp-sass');             // Compiles sass
var sourcemaps      = require('gulp-sourcemaps');       // Generates sass sourcemaps
var imagemin 		= require('gulp-imagemin');			// Optimises images
var autoprefixer    = require('gulp-autoprefixer');     // Adds vendor prefixes to css rules
var browserSync     = require('browser-sync').create(); // Reloads the browser on file changes
var htmlmin         = require('gulp-htmlmin');
var del             = require('del');
var concat          = require('gulp-concat');
var rename          = require('gulp-rename');
var uglify          = require('gulp-uglify');
var cssnano         = require('gulp-cssnano');


require('es6-promise').polyfill();                      // Adds es6 promises support


/** ------------------------------------------------------------
 *  OPTIONS
 *  Tailor these to your project's needs
 */

// Set up a directories object for easy reference
var dirs = {
    cssDist     : 'dist/css',
    cssDev  : 'css',
    scss    : 'css/scss/**', // Includes all sub directories
    images  : 'images',
    imagesDist  : 'dist/images',
    full    : 'me',
    dist    : 'dist',
    fullDist : 'dist/me',
    jsFiles : 'scripts',
    jsDev  : 'scripts',
    jsDist : 'dist/scripts'
};

// Sass Output Settings
var sassConfig = {
    errLogToConsole: false,
    outputStyle: 'compressed'  // default: 'nested' to allow minifiying by bundles, or: 'expanded', 'compact', 'compressed'
};

// Autoprefixer config
var apConfig = {
    browsers: ['last 2 versions', '> 5%'],
    cascade: true
};


/** ------------------------------------------------------------
 *  TASKS
 */

// @task        : default
// @description : Runs the 'serve' task.
//                Called by simply running 'gulp' from the command line
gulp.task('default', ['serve']);

// @task        : clean
// @description : Clean Dist Folder before creating new files
gulp.task('clean', function () {
  var stream =  del([
    './dist/**/*'
  ]);
  return stream;
});

// @task        : sass
// @description : Compiles SCSS to CSS
gulp.task('sass', function(){

    has_error = ''; // Track errors during compile

	return gulp.src(dirs.scss + '/*.scss') 	// Get all files ending with .scss in app/scss and children dirs
        .pipe(sourcemaps.init())
        .pipe(sass(sassConfig).on('error', function(err){                   // Handle errors gracefully
            has_error = true;                                               // We have an error
            gutil.log( gutil.colors.red(err.message) );                     // Spit out the error
            this.emit('end');                                               // We can't continue so 'jump' to the end
        }))
        .pipe(autoprefixer(apConfig))                                       // Add out autoprefixing
        .pipe(sourcemaps.write())		                                    // Output sourcemaps to a separate file
        //.pipe(rename('master.min.css'))
        .pipe(gulp.dest(dirs.cssDev)) 				                            // Output compiled css to the css folder
        .pipe(browserSync.stream())

        .on('end', function(){
            gulp.src(dirs.cssDev + '/*.css')
            .pipe(cssnano({safe: true, autoprefixer: false}))
            .pipe(gulp.dest(dirs.cssDist));
                                                     // Handle the end event
            if(has_error === '') {                                          // If we don't have an error, compiling was successful
                gutil.log(gutil.colors.green('## CSS compile succeeded'));  // Woohoo!
            }
        });
});


// @task        : watch
// @description : Run the sass task when called, then watch for changes
gulp.task('watch', ['sass', 'clean'], function(){
    gulp.watch(dirs.scss +'/*.{scss,sass}', ['sass']);               // If any file changes, re-run the sass task
});

// @task        : script
// @description : Run script task to concat and uglify
gulp.task('scripts', ['clean'], function() {
    return gulp.src([dirs.jsFiles + '/**/*.js', '!scripts/scripts*.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(dirs.jsDist))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dirs.jsDev))
        .pipe(gulp.dest(dirs.jsDist));
});


// @task        : serve
// @description : Run the 'watch' task, then fire up the browser using a static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(dirs.scss +'/*.{scss,sass}', ['sass']);
    gulp.watch('./*.html').on('change', browserSync.reload);   // Reload the page when a view file changes
    browserSync.stream();
});


// @task        : imagemin
// @description : Optimise image compression. Run this prior to deployment.
//                May eventually end up being run automatically as part of a build script.
gulp.task('imagemin', ['clean'], function(){
    return gulp.src(dirs.images + '/*')         // Get all images
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 5
        }))
        .pipe(gulp.dest(dirs.imagesDist))
        .on('end', function(){
            gutil.log(gutil.colors.green('## Images optimised'));
        });
});

// @task        : html minify
// @description : Minify HTML.
//

//root
gulp.task('htmlminify', ['clean'], function() {
  var stream =  gulp.src('./*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        //minifyCSS: true,
        //minifyJS: {compress: {drop_console: true}},
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
    }))
    .pipe(gulp.dest(dirs.dist));
    return stream;
});
//top folder
gulp.task('fullhtmlminify', ['clean'], function() {
  var stream =  gulp.src(dirs.full + '/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        //minifyCSS: true,
        //minifyJS: {compress: {drop_console: true}},
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
    }))
    .pipe(gulp.dest(dirs.fullDist));
    return stream;
});


//production build task
gulp.task('build', ['clean', 'sass', 'scripts', 'imagemin', 'htmlminify', 'fullhtmlminify']);