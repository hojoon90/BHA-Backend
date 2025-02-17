package com.bupjangsa.domain.post.dto;

import com.bupjangsa.domain.file.dto.FileDto;
import com.bupjangsa.domain.post.entity.BoardBase;
import com.bupjangsa.domain.post.infra.component.PostFactory;
import com.bupjangsa.type.BoardType;
import com.bupjangsa.domain.user.entity.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

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
    public static class PostSummary {

        private Long postId;
        private String title;
        private String thumbName;
        private String createdBy;
        private Long viewCnt;
        private LocalDateTime createdAt;

        public static PostSummary from(BoardBase entity) {
            return PostSummary.builder()
                    .postId(entity.getPostId())
                    .title(entity.getTitle())
                    .thumbName("")
                    .viewCnt(entity.getViewCnt())
                    .createdBy(entity.getCreatedBy().getAccountId())
                    .createdAt(entity.getCreatedAt())
                    .build();
        }

    }

    @Getter
    @Builder
    public static class PostDetail {

        private Long postId;
        private String title;
        private String contents;
        @Setter
        private List<FileDto.FileInfo> fileList;
        private String createdBy;
        private Long viewCnt;
        private LocalDateTime createdAt;

        public static PostDetail from(BoardBase entity) {
            return PostDetail.builder()
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
