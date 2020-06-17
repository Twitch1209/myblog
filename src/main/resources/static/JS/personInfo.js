
var avatarPhoto;
function init(){
    //是否登录
    checkCookie();
    var myfile=document.getElementById("myFile");
    myfile.onchange=function(){
        var file=this.files[0];
        var url=window.URL.createObjectURL(file);
        document.getElementById("myImg").innerHTML="<img src='"+url+"' class='img-responsive'/>";
    }
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
        setPersonInfo(user);
	}
	else{
        //不在线
        var htmlStr='<li><a href="/login">登录</a></li><li><a href="/register">注册</a></li>';
        document.getElementById("loginInfo").innerHTML =htmlStr;
        alert("请先登录！");
        //跳转
        location.href="/login";
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
function setCookie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname+"="+cvalue+"; "+expires+";path=/";
}
function setPersonInfo(usr){
    $.ajax({
        type: "get",
        url: "/account/personInfo",
        contentType: "application/json;charset=utf-8",
        data: {"usr":usr},
        dataType: "json",
        success: function (data) {
           if (data.length != 0) {
                //alert(data.pwd);
                document.getElementById("usr").innerHTML =usr;
                document.getElementById("pwd").value =data.pwd;
                document.getElementById("email").value =data.email;
                document.getElementById("sign").innerHTML =data.sign;
                document.getElementById("myImg").innerHTML="<img src='/photo/show?fileName="+data.avatar+"' class='img-responsive'/>";
                avatarPhoto=data.avatar;
            }
        }, error: function (error) {
            console.log(error);
        }
    });
}
function changePersonInfo(){
    var usr=getCookie("username");
    var pwd=document.getElementById("pwd").value;
    var email=document.getElementById("email").value;
    var sign=document.getElementById("sign").value;
    //头像图片
    var avatarData=new FormData();
    avatarData.append('file',$('#myFile')[0].files[0]);
    //头像名
    var t1=$('#myFile').val();
    var avatar=t1.split("\\").pop();
    if(avatar!=""){
        //上传新的头像
        $.ajax({
            type: "POST",
            url: "/photo/testUpdate",
            //contentType: "application/json;charset=utf-8",
            contentType:false,
            processData:false,
            //data: {"file":file},
            data:avatarData,
            //dataType: "text",
            success: function (data) {
               if (data == "Success") {
                    alert("Success");
                }
            }, error: function (error) {
                console.log(error);
            }
        });
        $.ajax({
            type: "POST",
            url: "/account/changeInfo",
            data: {"usr":usr,"pwd":pwd,"avatar":avatar,"email":email,"sign":sign},
            dataType: "text",
            success: function (data) {
               if (data == "Success") {
                    location.reload();
                }
            }, error: function (error) {
                console.log(error);
            }
        });
    }
    else{
        avatar=avatarPhoto;
        //alert(usr+"/"+pwd+"/"+avatar+"/"+email+"/"+sign);
        $.ajax({
            type: "POST",
            url: "/account/changeInfo",
            data: {"usr":usr,"pwd":pwd,"avatar":avatar,"email":email,"sign":sign},
            dataType: "text",
            success: function (data) {
               if (data == "Success") {
                    location.reload();
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    }


}
