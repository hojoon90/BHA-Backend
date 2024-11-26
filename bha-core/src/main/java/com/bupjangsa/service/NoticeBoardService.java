package com.bupjangsa.service;

import com.bupjangsa.domain.post.dto.PostCriteria;
import com.bupjangsa.domain.post.entity.FreeBoard;
import com.bupjangsa.domain.post.entity.NewsBoard;
import com.bupjangsa.domain.post.entity.NoticeBoard;
import com.bupjangsa.domain.post.infra.component.PostFactory;
import com.bupjangsa.domain.post.infra.repository.NoticeBoardRepository;
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
import static com.bupjangsa.message.MessageConst.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeBoardService implements PostService{

    private final NoticeBoardRepository noticeBoardRepository;
    private final UserRepository userRepository;
    private final List<PostFactory> postFactoryList;

    @Override
    public boolean isValidService(BoardType boardType) {
        return boardType.equals(BoardType.NOTICE);
    }

    @Override
    @Transactional
    public void registerPost(Register boardDto){
        User user = userRepository.findById(boardDto.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND.getMessage()));

        Optional<Long> lastPostNo = noticeBoardRepository.findPostNoByBoardTypeOrderByPostNoDesc(boardDto.getBoardType());
        Long newPostNo = lastPostNo.map(i -> i + 1).orElse(1L);

        PostFactory factory = postFactoryList.stream()
                .filter(i -> i.selectFactory(boardDto.getBoardType())).findFirst().orElseThrow(() -> new RuntimeException(""));

        NoticeBoard entity = Optional.ofNullable(boardDto.toEntity(factory, user, newPostNo))
                .filter(NoticeBoard.class::isInstance)
                .map(NoticeBoard.class::cast)
                .orElseThrow(() -> new IllegalArgumentException("생성된 객체는 NewsBoard가 아닙니다."));

        noticeBoardRepository.save(entity);
    }

    @Override
    @Transactional
    public void updatePost(Update boardDto){

        User user = userRepository.findById(boardDto.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND.getMessage()));

        NoticeBoard post = noticeBoardRepository.findByPostNoAndBoardType(boardDto.getPostNo(), boardDto.getBoardType())
                .orElseThrow(() -> new NotFoundException(POST_NOT_FOUND.getMessage()));

        post.updatePostData(boardDto.getTitle(), boardDto.getContents(), user);
    }

    @Override
    @Transactional
    public void deletePost(Delete boardDto){

        User user = userRepository.findById(boardDto.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND.getMessage()));

        NoticeBoard post = noticeBoardRepository.findByPostNoAndBoardType(boardDto.getPostNo(), boardDto.getBoardType())
                .orElseThrow(() -> new NotFoundException(POST_NOT_FOUND.getMessage()));

        //등록자가 아닐 경우 예외처리
        if(!post.getCreatedBy().getAccountId().equals(user.getAccountId())){
            throw new ForbiddenException(FORBIDDEN_AUTHORIZED.getMessage());
        }

        noticeBoardRepository.delete(post);
    }

    @Override
    @Transactional
    //단건 조회
    public PostInfo selectPost(BoardType boardType, Long postNo){
        NoticeBoard noticeBoard = noticeBoardRepository.findByPostNoAndBoardType(postNo, boardType)
                .orElseThrow(() -> new NotFoundException(POST_NOT_FOUND.getMessage()));

        noticeBoard.updateViewCnt();
        return PostInfo.from(noticeBoard);
    }

    @Override
    //게시물 목록 조회
    public Page<PostInfo> selectPostList(PostCriteria.SearchList criteria, Pageable pageable){

        Page<NoticeBoard> boardPage = noticeBoardRepository.selectNoticePage(criteria, pageable);

        final List<PostInfo> boardInfoList = boardPage.getContent().stream()
                .map(PostInfo::from)
                .toList();

        return new PageImpl<>(boardInfoList, pageable, boardPage.getTotalElements());
    }

}
