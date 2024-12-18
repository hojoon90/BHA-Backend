package com.bupjangsa.dto.response;

import com.bupjangsa.domain.post.dto.PostDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class BoardResponse {

    @Getter
    @Builder
    public static class PostSummary {
        private Long postId;
        private String title;
        private Long viewCnt;
        private String createdBy;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public static PostSummary from(PostDto.PostSummary dto){
            return BoardResponse.PostSummary.builder()
                    .postId(dto.getPostId())
                    .title(dto.getTitle())
                    .viewCnt(dto.getViewCnt())
                    .createdBy(dto.getCreatedBy())
                    .createdAt(dto.getCreatedAt())
                    .build();
        }
    }

    @Getter
    @Builder
    public static class PostDetail {
        private Long postId;
        private String title;
        private String contents;
        private Long viewCnt;
        private String createdBy;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public static PostDetail from(PostDto.PostDetail dto){
            return BoardResponse.PostDetail.builder()
                    .postId(dto.getPostId())
                    .title(dto.getTitle())
                    .contents(dto.getContents())
                    .viewCnt(dto.getViewCnt())
                    .createdBy(dto.getCreatedBy())
                    .createdAt(dto.getCreatedAt())
                    .build();
        }
    }

    @Getter
    @Builder
    public static class PostPage{
        private long count;
        private int totalPages;
        private long pageSize;
        private List<PostSummary> postDetails;

        public static PostPage of(long count, int totalPages, long pageSize, List<PostDto.PostSummary> postDetails) {
            final List<PostSummary> collect = postDetails.stream().map(BoardResponse.PostSummary::from).toList();
            return PostPage.builder()
                    .count(count)
                    .totalPages(totalPages)
                    .pageSize(pageSize)
                    .postDetails(collect)
                    .build();
        }
    }

}
