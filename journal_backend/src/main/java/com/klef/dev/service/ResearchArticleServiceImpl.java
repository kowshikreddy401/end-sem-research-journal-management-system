package com.klef.dev.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.dev.entity.ResearchArticle;
import com.klef.dev.repository.ResearchArticleRepository;

@Service
public class ResearchArticleServiceImpl implements ResearchArticleService {

    @Autowired
    private ResearchArticleRepository repository;

    @Override
    public ResearchArticle createArticle(ResearchArticle article) {
        return repository.save(article);
    }

    @Override
    public List<ResearchArticle> getAllArticles() {
        return repository.findAll();
    }

    @Override
    public ResearchArticle updateArticle(Long id, ResearchArticle article) {
        ResearchArticle existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with id: " + id));

        existing.setTitle(article.getTitle());
        existing.setAuthor(article.getAuthor());
        existing.setJournalName(article.getJournalName());
        existing.setPublicationYear(article.getPublicationYear());
        existing.setCategory(article.getCategory());
        existing.setDoi(article.getDoi());

        return repository.save(existing);
    }

    @Override
    public void deleteArticle(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Article not found with id: " + id);
        }
        repository.deleteById(id);
    }
}
