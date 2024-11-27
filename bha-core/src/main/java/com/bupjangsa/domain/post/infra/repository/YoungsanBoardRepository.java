package com.bupjangsa.domain.post.infra.repository;

import com.bupjangsa.domain.post.entity.YoungsanBoard;
import com.bupjangsa.domain.post.infra.SearchPostRepository;
import com.bupjangsa.type.BoardType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface YoungsanBoardRepository extends JpaRepository<YoungsanBoard, Long>, SearchPostRepository {

    @Query("select b.postId from YoungsanBoard b " +
            "order by b.postId desc " +
            "limit 1 ")
    Optional<Long> findPostNoByBoardTypeOrderByPostNoDesc(@Param("boardType") BoardType boardType);
}
