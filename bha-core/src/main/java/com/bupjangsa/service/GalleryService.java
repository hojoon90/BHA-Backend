package com.bupjangsa.service;

import com.bupjangsa.domain.post.dto.PostCriteria;
import com.bupjangsa.domain.post.dto.PostDto;
import com.bupjangsa.type.BoardType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GalleryService implements PostService{

    @Override
    public boolean isValidService(BoardType boardType) {
        return boardType.equals(BoardType.GALLERY);
    }

    @Override
    public Long registerPost(PostDto.Register boardDto) {
        return null;
    }

    @Override
    public void updatePost(PostDto.Update boardDto) {

    }

    @Override
    public void deletePost(PostDto.Delete boardDto) {

    }

    @Override
    public PostDto.PostInfo selectPost(Long postId) {
        return null;
    }

    @Override
    public Page<PostDto.PostInfo> selectPostList(PostCriteria.SearchList criteria, Pageable pageable) {
        return null;
    }
}
