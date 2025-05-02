package com.bupjangsa.service;


import com.bupjangsa.domain.post.dto.PostCriteria;
import com.bupjangsa.domain.post.dto.PostDto;
import com.bupjangsa.domain.post.entity.BoardBase;
import com.bupjangsa.domain.user.entity.User;
import com.bupjangsa.domain.user.infra.UserRepository;
import com.bupjangsa.exception.ForbiddenException;
import com.bupjangsa.exception.NotFoundException;
import com.bupjangsa.service.boards.BoardProvider;
import com.bupjangsa.type.BoardType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.bupjangsa.constant.MessageConst.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final List<BoardProvider<? extends BoardBase>> boardProviders;
    private final UserRepository userRepository;

    @Transactional
    public Long registerPost(PostDto.Register boardDto){
        User user = userRepository.findById(boardDto.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        BoardProvider<? extends BoardBase> provider = boardProviders.stream()
                .filter(i -> i.selectProvider(boardDto.getBoardType()))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(DATA_NOT_FOUND))
                ;

        return provider.savePostAndGetNo(boardDto, user);
    }

    @Transactional
    public void updatePost(PostDto.Update boardDto){

        User user = userRepository.findById(boardDto.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        BoardProvider<? extends BoardBase> provider = boardProviders.stream()
                .filter(i -> i.selectProvider(boardDto.getBoardType()))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(DATA_NOT_FOUND));

        BoardBase post = provider.findPostData(boardDto.getPostId());

        post.updatePostData(boardDto.getTitle(), boardDto.getContents(), user);
    }

    @Transactional
    public void deletePost(PostDto.Delete boardDto){

        User user = userRepository.findById(boardDto.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        BoardProvider<? extends BoardBase> provider = boardProviders.stream()
                .filter(i -> i.selectProvider(boardDto.getBoardType()))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(DATA_NOT_FOUND));

        BoardBase post = provider.findPostData(boardDto.getPostId());

        //등록자가 아닐 경우 예외처리
        if(!post.getCreatedBy().getAccountId().equals(user.getAccountId())){
            throw new ForbiddenException(FORBIDDEN_AUTHORIZED);
        }

        provider.deletePost(post);
    }

    @Transactional
    //단건 조회
    public PostDto.PostDetail selectPost(BoardType boardType, Long postId){

        BoardProvider<? extends BoardBase> provider = boardProviders.stream()
                .filter(i -> i.selectProvider(boardType))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(DATA_NOT_FOUND));

        BoardBase post = provider.findPostData(postId);

        //조회수 증가
        post.updateViewCnt();
        return PostDto.PostDetail.from(post);
    }

    //게시물 목록 조회
    public Page<PostDto.PostSummary> selectPostList(BoardType boardType, PostCriteria.SearchList criteria, Pageable pageable){

        BoardProvider<? extends BoardBase> provider = boardProviders.stream()
                .filter(i -> i.selectProvider(boardType))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(DATA_NOT_FOUND));

        Page<? extends BoardBase> boardPage = provider.selectPostList(criteria, pageable);

        final List<PostDto.PostSummary> boardInfoList = boardPage.getContent().stream()
                .map(PostDto.PostSummary::from)
                .toList();

        return new PageImpl<>(boardInfoList, pageable, boardPage.getTotalElements());
    }

}
