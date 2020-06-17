function init(){
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
function logout(){
    setCookie("username","",30);
    location.reload();
}
function sendLogin(){
    var a=document.getElementById('usr').value;
    var b=document.getElementById('pwd').value;
	var xhttp=new XMLHttpRequest();
	xhttp.open("POST","/account/testLogin",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	var msg="usr="+a+"&pwd="+b;
	xhttp.send(msg);
	xhttp.onreadystatechange=function(){
		if (this.readyState == 4 && this.status == 200) {
		    if(this.responseText=="Success"){
                if (a!="" && a!=null){
                    setCookie("username",a,30);
                }
                //跳转
                location.href="/index";
		    }
		    else{
		        alert("账号或密码错误！");
		        location.reload();
		    }
       	}
	}
	return false;
}
function checkCookie(){
	var user=getCookie("username");
	if (user!=""){
	    alert("您已登录");
		//alert("欢迎 " + user + " 再次访问");
	}
}
function setCookie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname+"="+cvalue+"; "+expires+";path=/";
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