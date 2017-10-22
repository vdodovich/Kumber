let gulp                =  require ("gulp");
let gulpSass            =  require ("gulp-sass");
let gulpAutoprefixer    =  require ("gulp-autoprefixer");
let browserSync         =  require ("browser-sync");
let gulpConcat          =  require ("gulp-concat");        // Обєднання файлів
let del                 =  require ("del");
let gulpImagemin        =  require ("gulp-imagemin");
let gulpCsso            =  require ("gulp-csso");          // Мініфікатор css
let gulpUglifyjs        =  require ("gulp-uglifyes");      // Мініфікатор js




gulp.task('scss', function () {
    return gulp.src('src/scss/main.scss')
        .pipe(gulpAutoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade:true}))
        .pipe(gulpConcat("style.css"))
        .pipe(gulpSass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('cssVendors', function () {
    return gulp.src('src/vendors/vendors.scss')
    .pipe(gulpSass())
    .pipe(gulp.dest('src/css'))
});
gulp.task('jsVendors', function () {
    return gulp.src([
        'src/vendors/jquery/dist/jquery.js',
    ])
    .pipe(gulpConcat("_vendors.js"))
    .pipe(gulp.dest('src/script'))
});
gulp.task('browserSync', function () {
    browserSync({
        server:{
            baseDir:'src'
        },
        notify: false,
        open: false
    });
});
gulp.task('watch',['browserSync', 'scss', 'cssVendors', 'jsVendors'], function () {
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/**/*.html', browserSync.reload);
    gulp.watch('src/script/**/*.js',[browserSync.reload]);
});

gulp.task('cleanDist', function () {
    return del.sync('dist');
});
gulp.task('img', function () {
    return gulp.src('src/images/**/*')
        .pipe(gulpImagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox:false}],
            optimizationLevel:5
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('build',['cleanDist', 'img', 'scss', 'cssVendors', 'jsVendors'], function () {
    // css
    let buildCss = gulp.src([
        'src/css/style.css',
        'src/css/vendors.css',
    ])
        .pipe(gulpCsso())
        .pipe(gulp.dest('dist/css'));

    // fonts
    let buildFonts = gulp.src('src/fonts/**/*')

        .pipe(gulp.dest('dist/fonts'));

    // js
    let buildJS = gulp.src('src/script/*.js')
        .pipe(gulpUglifyjs({
            mangle: false,
            ecma: 6
        }))
        .pipe(gulp.dest('dist/script'));


    // html
    let buildHTML=gulp.src('src/*html')
        .pipe(gulp.dest('dist'));


});



