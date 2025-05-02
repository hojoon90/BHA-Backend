package com.bupjangsa.service.boards;

import com.bupjangsa.domain.post.dto.PostCriteria;
import com.bupjangsa.domain.post.dto.PostDto;
import com.bupjangsa.domain.post.entity.BoardBase;
import com.bupjangsa.domain.user.entity.User;
import com.bupjangsa.type.BoardType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
public interface BoardProvider< T extends BoardBase> {
    boolean selectProvider(BoardType boardType);
    Long savePostAndGetNo(PostDto.Register dto, User user);
    T findPostData(Long postNo);
    void deletePost(BoardBase post);
    Page<T> selectPostList(PostCriteria.SearchList criteria, Pageable pageable);
}
