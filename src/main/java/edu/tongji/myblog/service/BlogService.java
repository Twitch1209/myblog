package edu.tongji.myblog.service;

import edu.tongji.myblog.entity.Blog;

import java.util.List;

public interface BlogService {
    String addBlog(String title,String author,String cover,String content);
    List<Blog> getRecommendBlog();
    List<Blog> getAllBlog(String usr);
    Blog getBlog(int blogId);
    void changeBlog(int blogId,String title,String author,String cover,String content);
}
