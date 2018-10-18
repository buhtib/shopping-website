/*
* @gulp：自动化任务
// task   创建一个任务
// src   获取文件
// watch  监听文件
// dest  输出文件
*/
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');   //压缩html
const miniCSS = require('gulp-clean-css'); //压缩css
const miniJS  = require('gulp-uglify');   //压缩js
const connect = require('gulp-connect');  //开启服务器
const imagemin = require('gulp-imagemin'); //图片压缩
Pngmin = require('imagemin-pngquant');  //png压缩
const babel = require('gulp-babel');

// 将根目录下的ico小图标和json文件，php文件放入dist
gulp.task('ico', function() {
    gulp.src('HUAWEI-project/favicon.ico')
    .pipe(gulp.dest('dist/'))
})
gulp.task('json', function() {
    gulp.src('HUAWEI-project/jsconfig.json') 
    .pipe(gulp.dest('dist/'))
})
gulp.task('php', function() {
    gulp.src('HUAWEI-project/php/*.*') 
    .pipe(gulp.dest('dist/php/'))
})
gulp.task('other',['ico','json','php']);

/*
* html压缩
*/
gulp.task('mini-html', function() {
    gulp.src('HUAWEI-project/*.html')
    .pipe(htmlmin({
          removeComments: true,       //清除HTML注释
          collapseWhitespace: true,  //压缩HTML(空格)
          minifyJS: true,            //压缩页面JS
          minifyCSS: true            //压缩页面CSS                          
    }))   
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
})

/*图片产出*/
gulp.task('images', function() {
    gulp.src('HUAWEI-project/img/*.*')
    // 压缩图片
    .pipe(imagemin({
        optimizationLevel: 4, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        // multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
        use:[Pngmin()]  //png图片的压缩
    }))
    .pipe(gulp.dest('dist/img/'))
})



/*css压缩*/
gulp.task('mini-css', function() {
    gulp.src('HUAWEI-project/css/*.css')
    .pipe(miniCSS({compatibility: 'ie6'}))
    .pipe(gulp.dest('dist/css/'))
    .pipe(connect.reload());
})


/* js压缩*/
gulp.task('mini-js', function() {
    gulp.src('HUAWEI-project/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(miniJS())
    .pipe(gulp.dest('dist/js/'))
    .pipe(connect.reload());
})

// 同时执行多个任务

gulp.task('watch', function() {
    // 监听app下面所有的html文件, 如果文件修改就执行html任务
    gulp.watch("HUAWEI-project/*.html", ['mini-html']);
    gulp.watch("HUAWEI-project/js/*.js", ['mini-js']);
    gulp.watch("HUAWEI-project/css/*.css", ['mini-css']);
})

// 开启本地服务器
gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: 1234,
        livereload: true // 开启页面刷新
    });
  });


/*生产环境*/
gulp.task('default', ['mini-html', 'mini-css','mini-js','images','other','connect', 'watch'])