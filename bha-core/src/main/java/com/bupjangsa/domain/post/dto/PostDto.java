package com.bupjangsa.domain.post.dto;

import com.bupjangsa.domain.post.entity.BoardBase;
import com.bupjangsa.domain.post.infra.component.PostFactory;
import com.bupjangsa.type.BoardType;
import com.bupjangsa.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PostDto {

    @Getter
    @Builder
    public static class Register{

        private String title;
        private String contents;
        private BoardType boardType;
        private Long userId;


        public BoardBase toEntity(PostFactory factory, User user){
            return factory.createPost(title, contents, user);
        }

    }

    @Getter
    @Builder
    public static class Update{

        private Long postId;
        private String title;
        private String contents;
        private BoardType boardType;
        private Long userId;

    }

    @Getter
    @Builder
    public static class Delete{

        private Long postId;
        private BoardType boardType;
        private Long userId;
    }

    @Getter
    @Builder
    public static class PostInfo {

        private Long postId;
        private String title;
        private String contents;
        private String createdBy;
        private Long viewCnt;
        private LocalDateTime createdAt;

        public static PostInfo from(BoardBase entity) {
            return PostInfo.builder()
                    .postId(entity.getPostId())
                    .title(entity.getTitle())
                    .contents(entity.getContents())
                    .viewCnt(entity.getViewCnt())
                    .createdBy(entity.getCreatedBy().getAccountId())
                    .createdAt(entity.getCreatedAt())
                    .build();
        }

    }

}
