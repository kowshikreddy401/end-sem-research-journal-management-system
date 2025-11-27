package com.klef.dev.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.klef.dev.entity.ResearchArticle;
import com.klef.dev.service.ResearchArticleService;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin(origins = "*")
public class ResearchArticleController {

    @Autowired
    private ResearchArticleService articleService;

    @GetMapping("/health")
    public String healthCheck() {
        return "Journal backend is up";
    }

    @PostMapping
    public ResearchArticle createArticle(@RequestBody ResearchArticle article) {
        return articleService.createArticle(article);
    }

    @GetMapping
    public List<ResearchArticle> getAllArticles() {
        return articleService.getAllArticles();
    }

    @PutMapping("/{id}")
    public ResearchArticle updateArticle(@PathVariable Long id,
                                         @RequestBody ResearchArticle article) {
        return articleService.updateArticle(id, article);
    }

    @DeleteMapping("/{id}")
    public void deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
    }
}
