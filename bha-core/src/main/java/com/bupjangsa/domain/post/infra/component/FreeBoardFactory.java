package com.bupjangsa.domain.post.infra.component;

import com.bupjangsa.domain.post.entity.FreeBoard;
import com.bupjangsa.domain.user.entity.User;
import com.bupjangsa.type.BoardType;
import org.springframework.stereotype.Component;

@Component
public class FreeBoardFactory implements PostFactory {

    @Override
    public boolean selectFactory(BoardType boardType) {
        return boardType.equals(BoardType.FREE_BOARD);
    }

    @Override
    public FreeBoard createPost(String title, String contents, User user) {
        return FreeBoard.builder()
                .title(title)
                .contents(contents)
                .viewCnt(0L)
                .createdBy(user)
                .build();
    }

}
