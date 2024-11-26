package com.bupjangsa.domain.post.infra.component;

import com.bupjangsa.domain.post.entity.YoungsanBoard;
import com.bupjangsa.domain.user.entity.User;
import com.bupjangsa.type.BoardType;
import org.springframework.stereotype.Component;

@Component
public class YoungsanBoardFactory implements PostFactory {

    @Override
    public boolean selectFactory(BoardType boardType) {
        return boardType.equals(BoardType.YOUNGSAN);
    }

    @Override
    public YoungsanBoard createPost(String title, String contents, BoardType boardType, User user, Long postNo) {
        return YoungsanBoard.builder()
                .postNo(postNo)
                .title(title)
                .contents(contents)
                .boardType(boardType)
                .viewCnt(0L)
                .createdBy(user)
                .build();
    }

}
