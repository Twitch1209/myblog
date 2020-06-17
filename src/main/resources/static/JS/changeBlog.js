
var coverPhoto;
function init(){
    //是否登录
    checkCookie();
    var blogId=getParam();
    setBlogInfo(blogId);

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

function changeBlog(){
    var blogId=getParam();
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
            url: "/blog/changeBlog",
            data: {"blogId":blogId,"title":title,"author":author,"cover":cover,"content":content},
            dataType: "text",
            success: function (data) {
               if (data == "Success") {
                    location.href="/blog?blogId="+blogId;
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
            url: "/blog/changeBlog",
            data: {"blogId":blogId,"title":title,"author":author,"cover":cover,"content":content},
            dataType: "text",
            success: function (data) {
               if (data == "Success") {
                    location.href="/blog?blogId="+blogId;
                }
            }, error: function (error) {
                console.log(error);
            }
        });
    }
}
/**
 * 获取指定的URL参数值
 * URL:http://www.quwan.com/index?name=tyler
 * 参数：paramName URL参数
 * 调用方法:getParam("name")
 * 返回值:tyler
 */
function getParam() {
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == "blogId".toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
}
function setBlogInfo(blogId){
    $.ajax({
        type: "GET",
        url: "/blog/getBlog",
        contentType: "application/json;charset=utf-8",
        data: {"blogId":blogId},
        dataType: "json",
        success: function (data) {
           if (data.length != 0) {
                document.getElementById("blogTitle").value =data.title;
                document.getElementById("content").value =data.content;
                var usr=getCookie("username");
                if(usr!=data.author){
                    alert("您不是该博客的作者！请先登录");
                    location.href="/blog?blogId="+blogId;
                }
                coverPhoto=data.cover;
                document.getElementById("myImg").innerHTML="<img src='/photo/show?fileName="+data.cover+"' class='img-responsive'/>";
            }
        }, error: function (error) {
            console.log(error);
        }
    });
}
