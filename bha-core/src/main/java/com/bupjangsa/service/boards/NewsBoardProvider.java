package com.bupjangsa.service.boards;

import com.bupjangsa.domain.post.dto.PostCriteria;
import com.bupjangsa.domain.post.dto.PostDto;
import com.bupjangsa.domain.post.entity.BoardBase;
import com.bupjangsa.domain.post.entity.NewsBoard;
import com.bupjangsa.domain.post.infra.board.NewsBoardRepository;
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
public class NewsBoardProvider implements BoardProvider<NewsBoard> {

    private final NewsBoardRepository newsBoardRepository;

    @Override
    public boolean selectProvider(BoardType boardType) {
        return boardType.equals(BoardType.NEWS_MESSAGE);
    }

    @Override
    public Long savePostAndGetNo(PostDto.Register dto, User user) {
        final NewsBoard entity = NewsBoard.builder()
                .title(dto.getTitle())
                .contents(dto.getContents())
                .viewCnt(0L)
                .createdBy(user)
                .build();

        return newsBoardRepository.save(entity).getPostId();
    }

    @Override
    public NewsBoard findPostData(Long postNo) {
        return newsBoardRepository.findById(postNo)
                .orElseThrow(() -> new NotFoundException(DATA_NOT_FOUND));
    }

    @Override
    public void deletePost(BoardBase post) {
        if (post instanceof NewsBoard newsPost) {
            newsBoardRepository.delete(newsPost);
        } else {
            throw new DataProcessException(SERVER_PROCESS_ERROR);
        }
    }

    @Override
    public Page<NewsBoard> selectPostList(PostCriteria.SearchList criteria, Pageable pageable) {
        return newsBoardRepository.selectNewsPage(criteria, pageable);
    }

}
