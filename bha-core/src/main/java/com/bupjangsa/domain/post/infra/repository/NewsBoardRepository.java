package com.bupjangsa.domain.post.infra.repository;

import com.bupjangsa.domain.post.entity.NewsBoard;
import com.bupjangsa.domain.post.infra.SearchPostRepository;
import com.bupjangsa.type.BoardType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface NewsBoardRepository extends JpaRepository<NewsBoard, Long>, SearchPostRepository {

    @Query("select b.postId from NewsBoard b " +
            "order by b.postId desc " +
            "limit 1 ")
    Optional<Long> findPostNoByBoardTypeOrderByPostNoDesc(@Param("boardType") BoardType boardType);
}
