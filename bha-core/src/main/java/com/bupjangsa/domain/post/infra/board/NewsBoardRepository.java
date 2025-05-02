package com.bupjangsa.domain.post.infra.board;

import com.bupjangsa.domain.post.entity.NewsBoard;
import com.bupjangsa.domain.post.infra.search.SearchPostRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsBoardRepository extends JpaRepository<NewsBoard, Long>, SearchPostRepository {

}
