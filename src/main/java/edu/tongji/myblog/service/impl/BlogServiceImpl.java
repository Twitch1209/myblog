package edu.tongji.myblog.service.impl;

import edu.tongji.myblog.entity.Blog;
import edu.tongji.myblog.mapper.BlogMapper;
import edu.tongji.myblog.service.BlogService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
@Transactional
public class BlogServiceImpl implements BlogService {
    @Resource
    private BlogMapper blogMapper;

    @Override
    public String addBlog(String title,String author,String cover,String content){
        blogMapper.addBlog(title,author,cover,content);
        return "Success";
    }

    @Override
    public List<Blog> getRecommendBlog(){
        return blogMapper.getRecommendBlog();
    }

    @Override
    public List<Blog> getAllBlog(String usr){
        return blogMapper.getAllBlog(usr);
    }

    @Override
    public Blog getBlog(int blogId){
        return blogMapper.getBlog(blogId);
    }

    @Override
    public void changeBlog(int blogId,String title,String author,String cover,String content){
        blogMapper.changeBlog(blogId,title,author,cover,content);
    }
}
