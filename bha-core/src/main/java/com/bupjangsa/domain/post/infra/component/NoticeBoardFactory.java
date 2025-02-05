package com.bupjangsa.domain.post.infra.component;

import com.bupjangsa.domain.post.entity.FreeBoard;
import com.bupjangsa.domain.post.entity.NoticeBoard;
import com.bupjangsa.domain.user.entity.User;
import com.bupjangsa.type.BoardType;
import org.springframework.stereotype.Component;

@Component
public class NoticeBoardFactory implements PostFactory {

    @Override
    public boolean selectFactory(BoardType boardType) {
        return boardType.equals(BoardType.NEWS_NOTICE);
    }

    @Override
    public NoticeBoard createPost(String title, String contents, User user) {
        return NoticeBoard.builder()
                .title(title)
                .contents(contents)
                .viewCnt(0L)
                .createdBy(user)
                .build();
    }

}
