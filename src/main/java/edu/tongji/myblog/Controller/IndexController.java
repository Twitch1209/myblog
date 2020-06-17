package edu.tongji.myblog.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(value = "/")
public class IndexController {

    /**
     * 跳转到主要界面
     * @author twitch
     */
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index() {
        return "index";
    }

    /**
     * 跳转到主要界面
     * @author twitch
     */
    @RequestMapping(value = "/blog", method = RequestMethod.GET)
    public String blog(@RequestParam("blogId") int blogId) {
        return "blog";
    }

    /**
     * 跳转到主要界面
     * @author twitch
     */
    @RequestMapping(value = "/personInfo", method = RequestMethod.GET)
    public String personInfo() {
        return "personInfo";
    }

    /**
     * 跳转到主要界面
     * @author twitch
     */
    @RequestMapping(value = "/write", method = RequestMethod.GET)
    public String write() {
        return "write";
    }

    /**
     * 跳转到登录界面
     * @author twitch
     */
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
        return "login";
    }

    /**
     * 跳转到注册界面
     * @author twitch
     */
    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public String register() {
        return "register";
    }

    /**
     * 跳转到注册界面
     * @author twitch
     */
    @RequestMapping(value = "/up", method = RequestMethod.GET)
    public String up() {
        return "up";
    }

    /**
     * 跳转到注册界面
     * @author twitch
     */
    @RequestMapping(value = "/show", method = RequestMethod.GET)
    public String show() {
        return "show";
    }

    /**
     * 跳转到注册界面
     * @author twitch
     */
    @RequestMapping(value = "/changeBlog", method = RequestMethod.GET)
    public String changeBlog(@RequestParam("blogId") int blogId) {
        return "changeBlog";
    }

}

