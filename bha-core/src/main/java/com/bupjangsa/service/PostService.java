package com.bupjangsa.service;

import com.bupjangsa.domain.post.dto.PostCriteria;
import com.bupjangsa.domain.post.infra.component.PostFactory;
import com.bupjangsa.type.BoardType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import static com.bupjangsa.domain.post.dto.PostDto.*;


@Service
public interface PostService {

    boolean isValidService(BoardType boardType);
    void registerPost(Register boardDto);
    void updatePost(Update boardDto);
    void deletePost(Delete boardDto);
    //단건 조회
    PostInfo selectPost(Long postId);
    //게시물 목록 조회
    Page<PostInfo> selectPostList(PostCriteria.SearchList criteria, Pageable pageable);

}
