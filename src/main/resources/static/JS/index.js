function init(){
    //是否登录
    checkCookie();
    getRecommendBlog();
    getUserInfo();
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
        getAllBlog();
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
function getRecommendBlog(){
    $.ajax({
        type: "GET",
        url: "/blog/getRecommendBlog",
        contentType: "application/json;charset=utf-8",
        //data: {"usr":usr},
        dataType: "json",
        success: function (data) {
            for(var i=0;i<data.length;i++){
                setBlog(data[i]);
            }
        }, error: function (error) {
            console.log(error);
        }
    });
}
function getAllBlog(){
    var usr=getCookie("username");
    $.ajax({
        type: "GET",
        url: "/blog/getAllBlog",
        contentType: "application/json;charset=utf-8",
        data: {"usr":usr},
        dataType: "json",
        success: function (data) {
            if(data.length<3){
                //显示所有
                for(var i=0;i<data.length;i++){
                    setBlog(data[i]);
                }
            }
            else{
            //只显示三篇
                for(var i=0;i<3;i++){
                    setBlog(data[i]);
                }
            }
            for(var j=0;j<data.length;j++){
                var htmlStr="<div style='display: flex;'><div style='flex: 1'><hr></div>";
                htmlStr+="<div style='text-align: center;line-height: 48px;color: #34374C'><a href='blog?blogId="+data[j].blogId+"'/>";
                htmlStr+=data[j].title+'</a></div>';
                htmlStr+="<div style='flex: 1'><hr></div></div>";
                document.getElementById("myAllBlog").innerHTML+=htmlStr;
            }

        }, error: function (error) {
            console.log(error);
        }
    });
}
function setBlog(data){
    var str=data.content;
    var con=str.substring(0,100);
    var htmlBlog='<div class="list-group-item item_article">';
    htmlBlog+='<div class="row">';
    htmlBlog+='<div class="div_center col-xs-9">';
    htmlBlog+='<a class="list-group-item-heading div_article_title" href="/blog?blogId='+data.blogId+'">';
    htmlBlog+='<strong>'+data.title+'</strong></a>';
    htmlBlog+='<p class="list-group-item-text div_article_content">';
    htmlBlog+=con+'</p></div>';
    htmlBlog+='<div class="col-xs-3 div_right_info">';
    htmlBlog+='<img class="iv_article img-rounded" src="/photo/show?fileName='+data.cover+'">';
    htmlBlog+='</div></div>';
    document.getElementById("blogLine").innerHTML+=htmlBlog;
}
function getUserInfo(){
    var usr=getCookie("username");
    $.ajax({
        type: "GET",
        url: "/account/personInfo",
        contentType: "application/json;charset=utf-8",
        data: {"usr":usr},
        dataType: "json",
        success: function (data) {
            var htmlStr='<img class="iv_user_head img-circle" src="/photo/show?fileName='+data.avatar+'">';
            htmlStr+='<div style="display: inline-block; margin-left: 12px;font-size: 18px;">'+usr+'</div>';
            document.getElementById("userInfo").innerHTML=htmlStr;
        }, error: function (error) {
            console.log(error);
        }
    });
}



