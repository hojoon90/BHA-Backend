package com.bupjangsa.dto.request;

import com.bupjangsa.type.BoardType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class BoardRequest {

    @Getter
    @Builder
    public static class PostRegisterRequest {

        private String title;
        private String contents;
        private BoardType boardType;

    }

    @Getter
    @Builder
    public static class PostUpdateRequest {

        private Long postId;
        private String title;
        private String contents;
        private BoardType boardType;

    }

    @Getter
    @Builder
    public static class PostDeleteRequest {

        private Long postId;
        private BoardType boardType;

    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class PageablePostSearchRequest {

        @Schema(description = "페이지 커서", example = "0")
        @NotNull
        @Min(0)
        private final Integer offset;

        @Schema(description = "페이지 당 조회 개수", example = "10")
        @NotNull
        @Min(1)
        private final Integer limit;

        @Schema(description = "게시판 타입")
        private final String boardType;

        public PageRequest getPageRequest() {
            int correctionOffset = Math.max(this.getOffset() - 1, 0);   //페이지 보정
            return PageRequest.of(correctionOffset, this.getLimit());
        }

        public static PageRequest getMainPageRequest() {
            return PageRequest.of(0, 5);
        }
    }

}
