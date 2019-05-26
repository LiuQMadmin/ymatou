
// 这里是require的配置文件
require.config({
    // 在每一个路径前面加上这个网址，这是绝对路径的写法
    // 这里是用本地服务器打开的
    baseUrl:"http://localhost:9999/",
    paths:{
        // 这里的路径是绝对路径。写的是相对于config文件来说的路径
        "jquery":"static/javascript/jquery-2.0.3",
        "temp":"static/javascript/template-web",
        "sw" : "static/javascript/swiper",
        // 可以让我们导入css文件必须要先引入css.js
        // 这个不是官方提供给的，二是网页自己写的
        "css":"static/javascript/css",
    },
    // 这个是给没有模块化的文件的config的配置方式
    shim:{
        "sw" : {
			deps : ["css!styles/swiper.css"]
		},

    }
})