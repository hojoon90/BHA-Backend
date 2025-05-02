package com.bupjangsa.service.boards;

import com.bupjangsa.domain.post.dto.PostCriteria;
import com.bupjangsa.domain.post.dto.PostDto;
import com.bupjangsa.domain.post.entity.BoardBase;
import com.bupjangsa.domain.post.entity.NoticeBoard;
import com.bupjangsa.domain.post.infra.board.NoticeBoardRepository;
import com.bupjangsa.domain.user.entity.User;
import com.bupjangsa.exception.DataProcessException;
import com.bupjangsa.exception.NotFoundException;
import com.bupjangsa.type.BoardType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import static com.bupjangsa.constant.MessageConst.DATA_NOT_FOUND;
import static com.bupjangsa.constant.MessageConst.SERVER_PROCESS_ERROR;

@Component
@RequiredArgsConstructor
public class NoticeBoardProvider implements BoardProvider<NoticeBoard> {

    private final NoticeBoardRepository noticeBoardRepository;

    @Override
    public boolean selectProvider(BoardType boardType) {
        return boardType.equals(BoardType.NOTICE);
    }

    @Override
    public Long savePostAndGetNo(PostDto.Register dto, User user) {
        final NoticeBoard entity = NoticeBoard.builder()
                .title(dto.getTitle())
                .contents(dto.getContents())
                .viewCnt(0L)
                .createdBy(user)
                .build();

        return noticeBoardRepository.save(entity).getPostId();
    }

    @Override
    public NoticeBoard findPostData(Long postNo) {
        return noticeBoardRepository.findById(postNo)
                .orElseThrow(() -> new NotFoundException(DATA_NOT_FOUND));
    }

    @Override
    public void deletePost(BoardBase post) {
        if (post instanceof NoticeBoard noticePost) {
            noticeBoardRepository.delete(noticePost);
        } else {
            throw new DataProcessException(SERVER_PROCESS_ERROR);
        }
    }

    @Override
    public Page<NoticeBoard> selectPostList(PostCriteria.SearchList criteria, Pageable pageable) {
        return noticeBoardRepository.selectNoticePage(criteria, pageable);
    }

}
