package com.bupjangsa.service.boards;

import com.bupjangsa.domain.post.dto.PostCriteria;
import com.bupjangsa.domain.post.dto.PostDto;
import com.bupjangsa.domain.post.entity.BoardBase;
import com.bupjangsa.domain.post.entity.FreeBoard;
import com.bupjangsa.domain.post.infra.board.FreeBoardRepository;
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
public class FreeBoardProvider implements BoardProvider<FreeBoard> {

    private final FreeBoardRepository freeBoardRepository;

    @Override
    public boolean selectProvider(BoardType boardType) {
        return boardType.equals(BoardType.FREE_BOARD);
    }

    @Override
    public Long savePostAndGetNo(PostDto.Register dto, User user) {
        final FreeBoard entity = FreeBoard.builder()
                .title(dto.getTitle())
                .contents(dto.getContents())
                .viewCnt(0L)
                .createdBy(user)
                .build();

        return freeBoardRepository.save(entity).getPostId();
    }

    @Override
    public FreeBoard findPostData(Long postNo) {
        return freeBoardRepository.findById(postNo)
                .orElseThrow(() -> new NotFoundException(DATA_NOT_FOUND));
    }

    @Override
    public void deletePost(BoardBase post) {
        if (post instanceof FreeBoard freePost) {
            freeBoardRepository.delete(freePost);
        } else {
            throw new DataProcessException(SERVER_PROCESS_ERROR);
        }
    }

    @Override
    public Page<FreeBoard> selectPostList(PostCriteria.SearchList criteria, Pageable pageable) {
        return freeBoardRepository.selectFreeBoardPage(criteria, pageable);
    }
}
