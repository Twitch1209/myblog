function sendRegister(){
    var a=document.getElementById('usr').value;
    var b=document.getElementById('pwd').value;
    var c=document.getElementById('pwd2').value;
    if(b==""){
        alert("密码不能为空");
        location.reload();
    }
    else if(parseInt(b.length)<4){
        alert("密码长度太短！");
        location.reload();
    }
    if(b.toString()!=c.toString()){
        alert("两次输入的密码不一致，请重新输入!");
        location.reload();
    }
	var xhttp=new XMLHttpRequest();
	xhttp.open("POST","/account/testRegister",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	var msg="usr="+a+"&pwd="+b;
	xhttp.send(msg);
	xhttp.onreadystatechange=function(){
		if (this.readyState == 4 && this.status == 200) {
			//alert(this.responseText);
			if (this.responseText=="Success"){
                setCookie("username",a,30);
                location.href="/index";
            }
            else{
                alert("用户名已被占用！");
                location.reload();
            }

       	}
	}
	return false;
}
function setCookie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname+"="+cvalue+"; "+expires+";path=/";
}
function logout(){
    setCookie("username","",30);
    location.reload();
}
function checkCookie(){
	var user=getCookie("username");
	if (user!=""){
		//alert("欢迎 " + user + " 再次访问");
        //在线
        var htmlStr='<li><a href="personInfo">'+user+'</a></li>';
        htmlStr+='<li><a onclick="logout()">登出</a></li>';
        document.getElementById("loginInfo").innerHTML =htmlStr;
	}
	else{
        //不在线
        var htmlStr='<li><a href="/login">登录</a></li><li><a href="/register">注册</a></li>';
        document.getElementById("loginInfo").innerHTML =htmlStr;
	}
}
function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
	}
	return "";
}
function init(){
    checkCookie();
}

