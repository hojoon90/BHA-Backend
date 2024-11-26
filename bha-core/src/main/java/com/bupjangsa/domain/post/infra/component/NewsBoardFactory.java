package com.bupjangsa.domain.post.infra.component;

import com.bupjangsa.domain.post.entity.FreeBoard;
import com.bupjangsa.domain.post.entity.NewsBoard;
import com.bupjangsa.domain.user.entity.User;
import com.bupjangsa.type.BoardType;
import org.springframework.stereotype.Component;

@Component
public class NewsBoardFactory implements PostFactory {

    @Override
    public boolean selectFactory(BoardType boardType) {
        return boardType.equals(BoardType.NEWS);
    }

    @Override
    public NewsBoard createPost(String title, String contents, BoardType boardType, User user, Long postNo) {
        return NewsBoard.builder()
                .postNo(postNo)
                .title(title)
                .contents(contents)
                .boardType(boardType)
                .viewCnt(0L)
                .createdBy(user)
                .build();
    }

}
