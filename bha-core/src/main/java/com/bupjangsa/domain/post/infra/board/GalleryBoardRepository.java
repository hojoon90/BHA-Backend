package com.bupjangsa.domain.post.infra.board;

import com.bupjangsa.domain.post.entity.GalleryBoard;
import com.bupjangsa.domain.post.infra.search.SearchPostRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryBoardRepository extends JpaRepository<GalleryBoard, Long>, SearchPostRepository {

}
