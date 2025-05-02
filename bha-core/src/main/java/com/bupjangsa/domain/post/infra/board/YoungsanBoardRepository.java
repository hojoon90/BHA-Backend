package com.bupjangsa.domain.post.infra.board;

import com.bupjangsa.domain.post.entity.YoungsanBoard;
import com.bupjangsa.domain.post.infra.search.SearchPostRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface YoungsanBoardRepository extends JpaRepository<YoungsanBoard, Long>, SearchPostRepository {

}
