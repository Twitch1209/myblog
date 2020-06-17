package edu.tongji.myblog.mapper;

import edu.tongji.myblog.entity.Blog;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BlogMapper {
    void addBlog(String title,String author,String cover,String content);
    List<Blog> getRecommendBlog();
    List<Blog> getAllBlog(String usr);
    Blog getBlog(int blogId);
    void changeBlog(int blogId,String title,String author,String cover,String content);
}
