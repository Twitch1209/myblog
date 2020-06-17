
var coverPhoto="test.jpg";
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

function addBlog(){
    var author=getCookie("username");
    var title=document.getElementById("blogTitle").value;
    var content=document.getElementById("content").value;
    //头像图片
    var coverData=new FormData();
    coverData.append('file',$('#myFile')[0].files[0]);
    //头像名
    var t1=$('#myFile').val();
    var cover=t1.split("\\").pop();
    if(cover!=""){
        //上传新的图片
        $.ajax({
            type: "POST",
            url: "/photo/testUpdate",
            //contentType: "application/json;charset=utf-8",
            contentType:false,
            processData:false,
            //data: {"file":file},
            data:coverData,
            //dataType: "text",
            success: function (data) {
               if (data == "Success") {
                    //alert("Success");
                }
            }, error: function (error) {
                console.log(error);
            }
        });
        $.ajax({
            type: "POST",
            url: "/blog/addBlog",
            data: {"title":title,"author":author,"cover":cover,"content":content},
            dataType: "text",
            success: function (data) {
               if (data == "Success") {
                    location.href="/index";
                }
            }, error: function (error) {
                console.log(error);
            }
        });
    }
    else{
        cover=coverPhoto;
        $.ajax({
            type: "POST",
            url: "/blog/addBlog",
            data: {"title":title,"author":author,"cover":cover,"content":content},
            dataType: "text",
            success: function (data) {
               if (data == "Success") {
                    location.href="/index";
                }
            }, error: function (error) {
                console.log(error);
            }
        });
    }
}
