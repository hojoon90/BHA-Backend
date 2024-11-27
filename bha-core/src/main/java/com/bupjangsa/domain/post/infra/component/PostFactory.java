package com.bupjangsa.domain.post.infra.component;

import com.bupjangsa.domain.post.entity.BoardBase;
import com.bupjangsa.domain.user.entity.User;
import com.bupjangsa.type.BoardType;
import org.springframework.stereotype.Component;

@Component
public interface PostFactory {
    boolean selectFactory(BoardType boardType);

    BoardBase createPost(String title, String contents, User user);
}
