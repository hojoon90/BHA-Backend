package com.bupjangsa.domain.file.infra;

import com.bupjangsa.domain.file.entity.File;
import com.bupjangsa.type.BoardType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface FileRepository extends JpaRepository<File, Long> {

    Optional<List<File>> findAllByPostIdAndBoardType(@Param("postId") Long postId,
                                                     @Param("boardType") BoardType boardType);

    @Transactional
    @Modifying
    @Query("delete File f where f.postId=:postId and f.boardType=:boardType")
    void deleteAllFileInfoByPostIdAndBoardType(@Param("postId") Long postId,
                                               @Param("boardType") BoardType boardType);

}
