package com.bupjangsa.domain.post.infra.repository;

import com.bupjangsa.domain.post.entity.YoungsanBoard;
import com.bupjangsa.domain.post.infra.SearchPostRepository;
import com.bupjangsa.type.BoardType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface YoungsanBoardRepository extends JpaRepository<YoungsanBoard, Long>, SearchPostRepository {

    Optional<YoungsanBoard> findByPostNoAndBoardType(Long postNo, BoardType boardType);

    @Query("select b.postNo from YoungsanBoard b " +
            "order by b.postNo desc " +
            "limit 1 ")
    Optional<Long> findPostNoByBoardTypeOrderByPostNoDesc(@Param("boardType") BoardType boardType);
}
