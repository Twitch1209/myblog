package edu.tongji.myblog.mapper;

import edu.tongji.myblog.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    String getAccount(String usr);
    List<User> getAllUser();
    void register(String usr,String pwd);
    void changeInfo(String usr,String pwd,String avatar,String email,String sign);
    User getUser(String usr);
}
