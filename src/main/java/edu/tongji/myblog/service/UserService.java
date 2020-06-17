package edu.tongji.myblog.service;

import edu.tongji.myblog.entity.User;

import java.util.List;

public interface UserService {
    List<User> getAllUser();
    int register(String usr,String pwd);
    int login(String usr, String pwd);
    void changeInfo(String usr,String pwd,String avatar,String email,String sign);
    User getUser(String usr);
}
