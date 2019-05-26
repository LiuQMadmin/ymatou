
// 登录验证
function check(){
    let LoginName=document.getElementById("LoginName");
    let PassWord=document.getElementById("PassWord");
    let array=JSON.parse(localStorage.getItem("user"));
    let loginBtn=document.getElementById("loginBtn");
    let user=LoginName.value;
    let pass=PassWord.value;
    var flag=false;
    array.forEach(function(item){
        if(item.user==user&&item.password==pass) {
            sessionStorage.setItem("yonghu",JSON.stringify(
                {
                    user:user,
                }
            ))
            loginBtn.href="http://localhost:9999/html/index.html"
            flag=true;
            alert("登录成功！");
        }
    });
    if(!flag){
            loginBtn.href="#";
            alert("用户名或密码错误！");
    }
}

// 验证获取
// function yanzhengma(){
   
//     let ConfirmImage=document.getElementById("ConfirmImage");
//     let array=["A","B","C","D","E","F","G","E","H","I","G","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
//     let index1=Math.floor(Math.random()*25);
//     let index2=Math.floor(Math.random()*25);
//    let changesrc="//www.ymatou.com/Login/GetImgCode?guid&#x3E;a877b8fe-8cd6-45d3-b80b-e9a5177232"+array[index1]+array[index2];
//    location.reload();
//     ConfirmImage.src=changesrc;
    
// }




// JSON.parse(localStorage.getItem("user"))[0].user

// 这里是注册的代码
// localStorage.setItem("user",JSON.stringify(
//     [
//         {
//         user:"15611279607",
//         password:"123456",
//         },
//         {
//         user:"17853470269",
//         password:"123456",
//         },
//         {
//             user:"15964022703",
//             password:"123456",
//         }
//     ]
//))