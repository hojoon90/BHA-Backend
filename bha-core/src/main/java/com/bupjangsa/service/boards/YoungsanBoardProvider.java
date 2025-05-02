package com.bupjangsa.service.boards;

import com.bupjangsa.domain.post.dto.PostCriteria;
import com.bupjangsa.domain.post.dto.PostDto;
import com.bupjangsa.domain.post.entity.BoardBase;
import com.bupjangsa.domain.post.entity.YoungsanBoard;
import com.bupjangsa.domain.post.infra.board.YoungsanBoardRepository;
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
public class YoungsanBoardProvider implements BoardProvider<YoungsanBoard> {

    private final YoungsanBoardRepository youngsanBoardRepository;

    @Override
    public boolean selectProvider(BoardType boardType) {
        return boardType.equals(BoardType.NEWS_YOUNGSAN);
    }

    @Override
    public Long savePostAndGetNo(PostDto.Register dto, User user) {
        final YoungsanBoard entity = YoungsanBoard.builder()
                .title(dto.getTitle())
                .contents(dto.getContents())
                .viewCnt(0L)
                .createdBy(user)
                .build();

        return youngsanBoardRepository.save(entity).getPostId();
    }

    @Override
    public YoungsanBoard findPostData(Long postNo) {
        return youngsanBoardRepository.findById(postNo)
                .orElseThrow(() -> new NotFoundException(DATA_NOT_FOUND));
    }

    @Override
    public void deletePost(BoardBase post) {
        if (post instanceof YoungsanBoard youngsanPost) {
            youngsanBoardRepository.delete(youngsanPost);
        } else {
            throw new DataProcessException(SERVER_PROCESS_ERROR);
        }
    }

    @Override
    public Page<YoungsanBoard> selectPostList(PostCriteria.SearchList criteria, Pageable pageable) {
        return youngsanBoardRepository.selectYoungsanPage(criteria, pageable);
    }
}
