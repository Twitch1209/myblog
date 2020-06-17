package edu.tongji.myblog.Controller;

import edu.tongji.myblog.entity.Blog;
import edu.tongji.myblog.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "/blog")
public class BlogController {

    @Autowired
    private BlogService blogService;

    /**
     * 添加博客
     * @author twitch
     */
    @RequestMapping(value = "/addBlog", method = RequestMethod.POST)
    @ResponseBody
    public String addBlog(@RequestParam("title") String title,
                          @RequestParam("author") String author,
                          @RequestParam("cover") String cover,
                          @RequestParam("content") String content){
        String msg=this.blogService.addBlog(title,author,cover,content);
        return msg;
    }
    /**
     * 修改博客
     * @author twitch
     */
    @RequestMapping(value = "/changeBlog", method = RequestMethod.POST)
    @ResponseBody
    public String changeBlog(@RequestParam("blogId") int blogId,
                            @RequestParam("title") String title,
                          @RequestParam("author") String author,
                          @RequestParam("cover") String cover,
                          @RequestParam("content") String content){
        this.blogService.changeBlog(blogId,title,author,cover,content);
        return "Success";
    }

    /**
     * 查看博客
     * @author twitch
     */
    @RequestMapping(value = "/getBlog", method = RequestMethod.GET)
    @ResponseBody
    public Blog getBlog(@RequestParam("blogId")int blogId){
        Blog blog=this.blogService.getBlog(blogId);
        return blog;
    }

    /**
     * 查看所有博客
     * @author twitch
     */
    @RequestMapping(value="/getAllBlog", method = RequestMethod.GET)
    @ResponseBody
    private List<Blog> getAllBlog(@RequestParam("usr") String usr) {
        List<Blog> blogs =  this.blogService.getAllBlog(usr);
        return blogs;
    }

    /**
     * 查看推荐博客（暂时推荐第一、二篇）
     * @author twitch
     */
    @RequestMapping(value="/getRecommendBlog", method = RequestMethod.GET)
    @ResponseBody
    private List<Blog> getRecommendBlog() {
        List<Blog> recommendBlog =  this.blogService.getRecommendBlog();
        return recommendBlog;
    }
}
