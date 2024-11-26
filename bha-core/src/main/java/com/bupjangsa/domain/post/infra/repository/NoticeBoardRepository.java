package com.bupjangsa.domain.post.infra.repository;

import com.bupjangsa.domain.post.entity.NoticeBoard;
import com.bupjangsa.domain.post.infra.SearchPostRepository;
import com.bupjangsa.type.BoardType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface NoticeBoardRepository extends JpaRepository<NoticeBoard, Long>, SearchPostRepository {

    Optional<NoticeBoard> findByPostNoAndBoardType(Long postNo, BoardType boardType);

    @Query("select b.postNo from NoticeBoard b " +
            "order by b.postNo desc " +
            "limit 1 ")
    Optional<Long> findPostNoByBoardTypeOrderByPostNoDesc(@Param("boardType") BoardType boardType);
}
