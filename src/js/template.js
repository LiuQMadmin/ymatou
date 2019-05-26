

// 这里是摸板字符串
function template(id,list){
    let template=document.getElementById(id).innerHTML;
    template='print(`'+template+'`)';
    template=template.replace(/<%=(.+?)%>/g,'`)\nprint($1)\nprint(`');
    template=template.replace(/<%(.+?)%>/g,'`)\n$1\nprint(`');
    
    let codestr=`
    (function(list){
        let htmlstr="";
        function print(val){
            htmlstr+=val;
        }
        ${template}
        return htmlstr;
    })
    `
    let fun=eval(codestr);
    let str=fun(list);
    return str;
}

// 加载jsonp数据的函数
function xianshi($){
   
	let categoryMenu=document.getElementById("categoryMenu");
    
    let downlist=document.getElementsByClassName("category-downlist")[0];
    let category=document.getElementsByClassName("category-box")[0];
    let wrapabc=document.getElementById("wrapabc");
		categoryMenu.addEventListener("mouseover",function(){
	   $.ajax({
                url : `https://www.ymatou.com/guess/api/getCategoryBigList?_=1558660340020`,
                dataType : "jsonp",
                jsonp: "callback",
                success : function(data){
                    wrapabc.innerHTML="";
                     data.result.forEach(function(item){
                        let ht=template("fenlei",item);
                        wrapabc.innerHTML+=ht;
                     })
					
                }
            });
        categoryMenu.className="menu-item select";
        downlist.style.visibility="visible";
        category.style.opacity=1;
		})
        
        
    categoryMenu.onmouseout=function(){
        setTimeout(function(){
            categoryMenu.className="menu-item";
            downlist.style.visibility="hidden";
             category.style.opacity=0;
        },1000)
        
    }
}

// 这里是倒计时函数的
function getTime(){
    var time=7200000;
    var hours=document.getElementsByClassName("hours")[0];
    var minutes=document.getElementsByClassName("minutes")[0];
    var seconds=document.getElementsByClassName("seconds")[0];
    setInterval(function(){
        var hour=parseInt(time/(1000*60*60));
        var min=parseInt((time-hour*1000*60*60)/(1000*60));
        var sec=parseInt((time-hour*1000*60*60-min*60*1000)/1000);
        hours.innerHTML="0"+hour;
        minutes.innerHTML=min;
        seconds.innerHTML=sec;
        time-=1000;
    },1000) 
}
// 图片移动事件
function tupian(){
    let sliderpage=document.getElementsByClassName("slider-page")[0];
    let overimg=document.getElementById("overimg");
    overimg.onmouseover=function(){
        sliderpage.style.display="block";
    }
    overimg.onmouseout=function(){
        sliderpage.style.display="none";
    }
}

// 图片轮播
 function lunbo(){
     let swithtodaybanner=document.getElementsByClassName("swith-today-banner")[0].children;
    
     let qian=document.getElementById("qian");
     let hou=document.getElementById("hou");
    var i=2;
     qian.onclick=function(){
         if(i==0){
            swithtodaybanner[8].className="swith-img swith-img-prev";
            swithtodaybanner[i].className="swith-img swith-img-active";
            swithtodaybanner[i+1].className="swith-img swith-img-next";
         }
         else if(i==8){
            swithtodaybanner[i-1].className="swith-img swith-img-prev";
            swithtodaybanner[i].className="swith-img swith-img-active";
            swithtodaybanner[0].className="swith-img swith-img-next";
         }else{
            swithtodaybanner[i-1].className="swith-img swith-img-prev";
            swithtodaybanner[i].className="swith-img swith-img-active";
            swithtodaybanner[i+1].className="swith-img swith-img-next";
         }
            i++;
            i=i%8;
    } 
    hou.onclick=function(){
        if(i==0){
            swithtodaybanner[8].className="swith-img swith-img-prev";
            swithtodaybanner[i].className="swith-img swith-img-active";
            swithtodaybanner[i+1].className="swith-img swith-img-next";
            i=8;
         }
         else if(i==8){
            swithtodaybanner[i-1].className="swith-img swith-img-prev";
            swithtodaybanner[i].className="swith-img swith-img-active";
            swithtodaybanner[0].className="swith-img swith-img-next";
            i=0;
         }else{
            swithtodaybanner[i-1].className="swith-img swith-img-prev";
            swithtodaybanner[i].className="swith-img swith-img-active";
            swithtodaybanner[i+1].className="swith-img swith-img-next";
         }
            i--;
            
    }
}

// 这里是这是登录状态的函数
function denglu(){
    let title=document.getElementById("login");
    let yonghu=JSON.parse(sessionStorage.getItem("yonghu"));
    try{
        if(yonghu.user!=""){
            title.innerHTML=yonghu.user;
        }
    }catch(e){

    }
    
}



// 这里输入框中的提示
function shuru($){
    let search=document.getElementsByClassName("J_input-search")[0];
    // 这个是向里面插入内容的
    let sousuo=document.getElementById("sousuo");
    let searchrecomend=document.getElementById("search-recomend");
    // 聚焦
    search.addEventListener("focus",function(){

         $.ajax({
                 url : `https://www.ymatou.com/products/api/getEverybodySearch?_=1558748746678`,
                 dataType : "jsonp",
                 jsonp: "callback",
                 success : function(data){
                     //console.log(data);
                    sousuo.innerHTML="";
                      data.Data.KeywordList.forEach(function(list){
                         let ht=template("tishi",list);
                         sousuo.innerHTML+=ht;
                      })
                     
                 }
             });
             searchrecomend.style.display="block";
    })
    // 失去焦点
    search.addEventListener("blur",function(){
        searchrecomend.style.display="none";
    })
   
}

// 返回顶部
function fanhuidingbu(){
    document.documentElement.scrollTop = document.body.scrollTop =0;
}



