const gulp = require("gulp");
const babel = require("gulp-babel");
const webserver = require("gulp-webserver");
const sass = require('gulp-sass');
const express = require('express');
const https=require("https");




//测试用的 正常
gulp.task("aaa", function () {
    console.log("aaa");
})
// //测试js编译的编译  正常
// gulp.task("babel",function(){
//     gulp.src("./index.js")
//     .pipe(babel({
//         presets: ['@babel/env']
//     }))
//     .pipe(gulp.dest("./dist"))
// })


//测试webserver 成功
// gulp.task('webserver', function() {
//     gulp.src("dist")
//       .pipe(webserver({
//         port:9999,
//         livereload: true,
//       }));
//   });


//   测试scss  正常
gulp.task("sass", function () {
    gulp.src("./src/scss/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./dist/css"))
});

// 兼容加上拷贝js
gulp.task("babel", function () {
    gulp.src("./src/js/**/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest("./dist/js"))
})


// 拷贝html
gulp.task("html", function () {
    gulp.src("./src/html/**/*.html")
        .pipe(gulp.dest("./dist/html"))
})






// 测试动态加载 
gulp.task('webserver', function () {
    gulp.src("dist")
        .pipe(webserver({
            port: 9999,
            livereload: true,
        }));
    gulp.src("src/static/**/*").pipe(gulp.dest("dist/static"));
    gulp.watch("./src/js/*.js", ["babel"]);
    gulp.watch("./src/scss/*.scss", ["sass"]);
    gulp.watch("./src/html/*.html", ["html"]);


    // 这里是处理ajax的跨域请求的
    let app = express();
    //    这句话就是表示ajax请求
    app.get('/xiangqing', function (req, res) {
        // 这里是打印地址的
        //  console.log(req.query.productid);
         console.log(req.query._);
        //  判断数据连接的
        let lujing=null;
        if(req.query.productid!=undefined){
            if(req.query.pageindex!=undefined&&req.query.pagesize!=undefined){
                lujing="/product/api/GetRecommendList?productid="+req.query.productid+"&pageindex="+req.query.pageindex+"&pagesize="+req.query.pagesize+"&_="+req.query._;
            }else{
                lujing="/product/api/GetProductDescription?productid="+req.query.productid+"&_="+req.query._;
            }
        }else{
            lujing="/product/api/GetSellerWellList?sellerid="+req.query.sellerid+"&pageindex="+req.query.pageindex+"&pagesize="+req.query.pagesize+"&_="+req.query._;
        }
        console.log(lujing);





        //允许任何人来访问这个服务器
        res.setHeader("Access-Control-Allow-Origin", "*");
        //设置一下发送的编码格式  text/pain这个表示发送的json数据
        // www.smartisan.com
        res.setHeader("Content-Type", "text/pain;charset=utf-8");

        let proxy = https.request({
            // 在http之下所有就不用再加https或者http了
            hostname: "www.ymatou.com",
            // 这里是hostname之后的内容"/product/api/GetProductDescription?productid="+req.query.productid,
            path: lujing,
            method: "get",
        }, (response) => {
            response.pipe(res);
        });
        proxy.end();
    })
    app.listen(3000);
    // 这里是结束ajax跨域请求的

   

});