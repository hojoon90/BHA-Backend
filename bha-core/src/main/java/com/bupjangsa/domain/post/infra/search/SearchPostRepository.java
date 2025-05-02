package com.bupjangsa.domain.post.infra.search;

import com.bupjangsa.domain.post.dto.PostCriteria;
import com.bupjangsa.domain.post.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SearchPostRepository {
    Page<YoungsanBoard> selectYoungsanPage(PostCriteria.SearchList criteria, Pageable pageable);
    Page<FreeBoard> selectFreeBoardPage(PostCriteria.SearchList criteria, Pageable pageable);
    Page<NoticeBoard> selectNoticePage(PostCriteria.SearchList criteria, Pageable pageable);
    Page<NewsBoard> selectNewsPage(PostCriteria.SearchList criteria, Pageable pageable);
    Page<GalleryBoard> selectGalleryPage(PostCriteria.SearchList criteria, Pageable pageable);

}
