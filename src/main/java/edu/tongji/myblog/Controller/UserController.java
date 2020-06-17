package edu.tongji.myblog.Controller;

import edu.tongji.myblog.entity.User;
import edu.tongji.myblog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/account")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 登录
     * 返回1说明成功
     */
    @RequestMapping(value = "/testLogin", method = RequestMethod.POST)
    @ResponseBody
    public String testLogin(@RequestParam("usr") String usr,
                            @RequestParam("pwd") String pwd) {
        int flag=this.userService.login(usr,pwd);
        if(flag==1){
            return "Success";
        }
        else{
            return "error";
        }
    }

    /**
     * 注册
     * @author twitch
     */
    @RequestMapping(value = "/testRegister", method = RequestMethod.POST)
    @ResponseBody
    public String testRegister(@RequestParam("usr") String usr,
                            @RequestParam("pwd") String pwd) {
        System.out.print("testRegister!");
        int flag=this.userService.register(usr,pwd);
        if(flag==1){
            return "Success";
        }
        else{
            return "error";
        }
    }

    /**
     * 变换个人信息
     * @author twitch
     */
    @RequestMapping(value = "/changeInfo", method = RequestMethod.POST)
    @ResponseBody
    public String changeInfo(@RequestParam("usr") String usr,
                             @RequestParam("pwd") String pwd,
                             @RequestParam("avatar") String avatar,
                             @RequestParam("email") String email,
                             @RequestParam("sign") String sign) {
        this.userService.changeInfo(usr,pwd,avatar,email,sign);
        return "Success";
    }

    /**
     * 个人信息
     * @author twitch
     */
    @RequestMapping(value = "/personInfo", method = RequestMethod.GET)
    @ResponseBody
    public User personInfo(@RequestParam("usr") String usr) {
        User personInfo=this.userService.getUser(usr);
        return personInfo;
    }

}
