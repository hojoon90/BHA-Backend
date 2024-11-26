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
    public static class PostDetail {
        private Long postNo;
        private String title;
        private String contents;
        private Long viewCnt;
        private String createdBy;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public static PostDetail from(PostDto.PostInfo dto){
            return PostDetail.builder()
                    .postNo(dto.getPostNo())
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
        private List<PostDetail> postDetails;

        public static PostPage of(long count, int totalPages, long pageSize, List<PostDto.PostInfo> postDetails) {
            final List<PostDetail> collect = postDetails.stream().map(PostDetail::from).toList();
            return PostPage.builder()
                    .count(count)
                    .totalPages(totalPages)
                    .pageSize(pageSize)
                    .postDetails(collect)
                    .build();
        }
    }

}
