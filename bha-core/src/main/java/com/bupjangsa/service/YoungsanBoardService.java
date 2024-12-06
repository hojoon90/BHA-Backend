package com.bupjangsa.service;

import com.bupjangsa.domain.post.dto.PostCriteria;
import com.bupjangsa.domain.post.entity.YoungsanBoard;
import com.bupjangsa.domain.post.infra.component.PostFactory;
import com.bupjangsa.domain.post.infra.repository.YoungsanBoardRepository;
import com.bupjangsa.domain.user.entity.User;
import com.bupjangsa.domain.user.infra.UserRepository;
import com.bupjangsa.exception.ForbiddenException;
import com.bupjangsa.exception.NotFoundException;
import com.bupjangsa.type.BoardType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.bupjangsa.domain.post.dto.PostDto.*;
import static com.bupjangsa.constant.MessageConst.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class YoungsanBoardService implements PostService{

    private final YoungsanBoardRepository youngsanBoardRepository;
    private final UserRepository userRepository;
    private final List<PostFactory> postFactoryList;

    @Override
    public boolean isValidService(BoardType boardType) {
        return boardType.equals(BoardType.YOUNGSAN);
    }

    @Override
    @Transactional
    public Long registerPost(Register boardDto){
        User user = userRepository.findById(boardDto.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND.getMessage()));

        PostFactory factory = postFactoryList.stream()
                .filter(i -> i.selectFactory(boardDto.getBoardType())).findFirst().orElseThrow(() -> new RuntimeException(""));

        YoungsanBoard entity = Optional.ofNullable(boardDto.toEntity(factory, user))
                .filter(YoungsanBoard.class::isInstance)
                .map(YoungsanBoard.class::cast)
                .orElseThrow(() -> new IllegalArgumentException("생성된 객체는 YoungsanBoard가 아닙니다."));

        return youngsanBoardRepository.save(entity).getPostId();
    }

    @Override
    @Transactional
    public void updatePost(Update boardDto){

        User user = userRepository.findById(boardDto.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND.getMessage()));

        YoungsanBoard post = youngsanBoardRepository.findById(boardDto.getPostId())
                .orElseThrow(() -> new NotFoundException(POST_NOT_FOUND.getMessage()));

        post.updatePostData(boardDto.getTitle(), boardDto.getContents(), user);
    }

    @Override
    @Transactional
    public void deletePost(Delete boardDto){

        User user = userRepository.findById(boardDto.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND.getMessage()));

        YoungsanBoard post = youngsanBoardRepository.findById(boardDto.getPostId())
                .orElseThrow(() -> new NotFoundException(POST_NOT_FOUND.getMessage()));

        //등록자가 아닐 경우 예외처리
        if(!post.getCreatedBy().getAccountId().equals(user.getAccountId())){
            throw new ForbiddenException(FORBIDDEN_AUTHORIZED.getMessage());
        }

        youngsanBoardRepository.delete(post);
    }

    @Override
    @Transactional
    //단건 조회
    public PostInfo selectPost(Long postId){
        YoungsanBoard youngsanBoard = youngsanBoardRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(POST_NOT_FOUND.getMessage()));

        youngsanBoard.updateViewCnt();
        return PostInfo.from(youngsanBoard);
    }

    @Override
    //게시물 목록 조회
    public Page<PostInfo> selectPostList(PostCriteria.SearchList criteria, Pageable pageable){

        Page<YoungsanBoard> boardPage = youngsanBoardRepository.selectYoungsanPage(criteria, pageable);

        final List<PostInfo> boardInfoList = boardPage.getContent().stream()
                .map(PostInfo::from)
                .toList();

        return new PageImpl<>(boardInfoList, pageable, boardPage.getTotalElements());
    }

}
