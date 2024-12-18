package com.bupjangsa.domain.file.infra;

import com.bupjangsa.domain.file.entity.File;
import com.bupjangsa.type.BoardType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FileRepository extends JpaRepository<File, Long> {

    Optional<List<File>> findAllByPostIdAndBoardType(@Param("postId") Long postId,
                                                    @Param("boardType") BoardType boardType);

}
