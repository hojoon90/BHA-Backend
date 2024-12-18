package com.bupjangsa.domain.post.infra.repository.board;

import com.bupjangsa.domain.post.entity.FreeBoard;
import com.bupjangsa.domain.post.infra.repository.search.SearchPostRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FreeBoardRepository extends JpaRepository<FreeBoard, Long>, SearchPostRepository {

}
