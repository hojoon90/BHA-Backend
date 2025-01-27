package com.bupjangsa.dto.request;

import com.bupjangsa.type.BoardType;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FileRequest {

    @Getter
    @Builder
    public static class FileInfoReq {

        @Schema(description = "저장된 파일 이름", example = "asd7fa73ifo9ajs8dl9k.jpg")
        @NotNull
        private String fileName;

        @Schema(description = "파일이 저장된 날짜", example = "2024-12-20 11:22:34")
        @NotNull
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime createdAt;
    }


}
