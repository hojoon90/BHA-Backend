package com.bupjangsa.domain.post.infra.repository;

import com.bupjangsa.domain.post.entity.FreeBoard;
import com.bupjangsa.domain.post.infra.SearchPostRepository;
import com.bupjangsa.type.BoardType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface FreeBoardRepository extends JpaRepository<FreeBoard, Long>, SearchPostRepository {

    Optional<FreeBoard> findByPostNoAndBoardType(Long postNo, BoardType boardType);

    @Query("select b.postNo from FreeBoard b " +
            "order by b.postNo desc " +
            "limit 1 ")
    Optional<Long> findPostNoByBoardTypeOrderByPostNoDesc(@Param("boardType") BoardType boardType);
}
