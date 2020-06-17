package edu.tongji.myblog.service.impl;


import edu.tongji.myblog.entity.User;
import edu.tongji.myblog.mapper.UserMapper;
import edu.tongji.myblog.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Resource
    private UserMapper userMapper;

    @Override
    public List<User> getAllUser(){return userMapper.getAllUser();}

    @Override
    public int register(String usr,String pwd){
        String pwdInDB= userMapper.getAccount(usr);
        System.out.println("usr"+usr+"/pwd"+pwd+"/pwdInDb"+pwdInDB);
        if(pwdInDB==null ||pwdInDB==""){
            userMapper.register(usr,pwd);
            //userMapper.login(usr);
            return 1;
        }
        else{
            return 0;
        }
    }

    @Override
    public int login(String usr, String pwd){
        String pwdInDB= userMapper.getAccount(usr);
        if(pwd.equals(pwdInDB)) {
            return 1;
        }else {
            return 0;
        }
    }

    @Override
    public void changeInfo(String usr,String pwd,String avatar,String email,String sign){
        userMapper.changeInfo(usr,pwd,avatar,email,sign);
    }

    @Override
    public User getUser(String usr){
        return userMapper.getUser(usr);
    }

}
