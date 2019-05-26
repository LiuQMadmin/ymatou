function check01() {
    let pwd=document.getElementById("password");
    var password = pwd.value;
    if(password.length == 0) {
        pwd_level_1.style.background = "silver";
        pwd_level_2.style.background = "silver";
        pwd_level_3.style.background = "silver";
        pwd_level_tip_1.style.visibility = "hidden";
        pwd_level_tip_2.style.visibility = "hidden";
        pwd_level_tip_3.style.visibility = "hidden";
        
    } else if (hasSpecial(password)) { //强
        pwd_level_1.style.background = "#FF0000";
        pwd_level_2.style.background = "#FF0";
        pwd_level_3.style.background = "#00FF00";
        pwd_level_tip_1.style.visibility = "hidden";
        pwd_level_tip_2.style.visibility = "hidden";
        pwd_level_tip_3.style.visibility = "visible";

    } else if (hasLetter(password) && hasNumber(password)) { //中
        pwd_level_1.style.background = "#FF0000";
        pwd_level_2.style.background = "#FF0";
        pwd_level_3.style.background = "silver";
        pwd_level_tip_1.style.visibility = "hidden";
        pwd_level_tip_2.style.visibility = "visible";
        pwd_level_tip_3.style.visibility = "hidden";
    } else {
        pwd_level_1.style.background = "#FF0000";
        pwd_level_2.style.background = "silver";
        pwd_level_3.style.background = "silver";
        pwd_level_tip_1.style.visibility = "visible";
        pwd_level_tip_2.style.visibility = "hidden";
        pwd_level_tip_3.style.visibility = "hidden";
    }
}

//判断一个字符串中是否包含特殊符号
function hasSpecial(str) {
    for (var i in str) {
        var asc = str.charCodeAt(i);
        if (!(asc >= 48 && asc <= 57 || asc >= 65 && asc <= 90 || asc >= 97 && asc <= 122)) {
            return true;
        }
    }
    return false;
}

//判断一个字符串中是否包含字母`..`
function hasLetter(str) {
    for (var i in str) {
        var asc = str.charCodeAt(i);
        if ((asc >= 65 && asc <= 90 || asc >= 97 && asc <= 122)) {
            return true;
        }
    } 
    return false;
}

//判断一个字符串中是否包含数字
function hasNumber(str) {
    for (var i in str) {
        var asc = str.charCodeAt(i);
        if (asc >= 48 && asc <= 57) {
            return true;
        }
    } 
    return false;
}





function check() {
    var mobile = document.getElementById("mobile");
    var password = document.getElementById("password");
    var ConfirmPwd = document.getElementById("ConfirmPwd");
    var registerbtnPhone = document.getElementById("registerbtnPhone");
    var mobilev = mobile.value;
    var passwordv = password.value;
    var ConfirmPwdv = ConfirmPwd.value;
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var patrn = /^(\w){6,20}$/;
  
    if (!myreg.test(mobilev)) {
      alert("手机号格式不正确！");
    } else if (!patrn.test(passwordv)) {
      alert("密码格式不正确!密码只能输入6-20个字母、数字、下划线");
    } else if (passwordv != ConfirmPwdv) {
      alert("两次密码不一致!");
    } else {
      alert("注册成功！");
      var array = JSON.parse(localStorage.getItem("user"));
      array.push({
        user: mobilev,
        password: ConfirmPwdv
      });
      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(array));
      registerbtnPhone.href = "http://localhost:9999/html/login.html";
    }
  }