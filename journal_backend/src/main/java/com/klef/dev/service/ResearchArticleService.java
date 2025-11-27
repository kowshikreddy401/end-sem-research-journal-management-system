package com.klef.dev.service;

import java.util.List;

import com.klef.dev.entity.ResearchArticle;

public interface ResearchArticleService {

    ResearchArticle createArticle(ResearchArticle article);

    List<ResearchArticle> getAllArticles();

    ResearchArticle updateArticle(Long id, ResearchArticle article);

    void deleteArticle(Long id);
}
