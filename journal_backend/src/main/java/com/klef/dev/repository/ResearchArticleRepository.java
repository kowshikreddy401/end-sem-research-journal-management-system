package com.klef.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.dev.entity.ResearchArticle;

@Repository
public interface ResearchArticleRepository extends JpaRepository<ResearchArticle, Long> {
}
