function init(){
    //是否登录
    checkCookie();
    var blogId=getParam();
    setBlogInfo(blogId);
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
function setCookie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname+"="+cvalue+"; "+expires+";path=/";
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
                document.getElementById("blogTitle").innerHTML =data.title;
                document.getElementById("blogContent").innerHTML =data.content;
                document.getElementById("author").innerHTML =data.author;
                showEdit(data.author);
                document.getElementById("blogCover").innerHTML+="<img src='/photo/show?fileName="+data.cover+"' class='img-responsive'/>";
                getAuthorAvatar(data.author);
            }
        }, error: function (error) {
            console.log(error);
        }
    });
}
function getAuthorAvatar(usr){
    $.ajax({
        type: "get",
        url: "/account/personInfo",
        contentType: "application/json;charset=utf-8",
        data: {"usr":usr},
        dataType: "json",
        success: function (data) {
           if (data.length != 0) {
                document.getElementById("authorPhoto").innerHTML="<img src='/photo/show?fileName="+data.avatar+"' class='img-circle' height='30px' width='30px'/>";
            }
        }, error: function (error) {
            console.log(error);
        }
    });
}
function showEdit(author){
    var usr=getCookie("username");
    if(author==usr){
        var htmlStr='<button type="submit" class="btn btn-default btn-lg" onclick="edit()">编辑</button>';
        document.getElementById("editMsg").innerHTML=htmlStr;
    }
}
function edit(){
    location.href="/changeBlog?blogId="+getParam();
}