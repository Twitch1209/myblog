package edu.tongji.myblog.entity;

import lombok.Data;

@Data
public class Blog {
    int blogId;
    String title;
    String author;
    String cover;
    String content;
}
