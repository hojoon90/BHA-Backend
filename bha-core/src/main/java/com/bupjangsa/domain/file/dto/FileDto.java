package com.bupjangsa.domain.file.dto;

import com.bupjangsa.domain.file.entity.File;
import com.bupjangsa.type.BoardType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FileDto {

    @Getter
    @Builder
    public static class Register{
        private long postId;
        private BoardType boardType;
        private String originName;
        private String saveName;
        private long fileSize;

        public File toEntity(){
            return File.builder()
                    .postId(postId)
                    .boardType(boardType)
                    .originName(originName)
                    .saveName(saveName)
                    .fileSize(fileSize)
                    .build();
        }
    }

    @Getter
    @Builder
    public static class FileInfo{
        private Long fileId;
        private Long postId;
        private BoardType boardType;
        private String fileName;
        private String originName;
        private long fileSize;
        //        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime createdAt;

        public static FileInfo from(File entity) {
            return FileInfo.builder()
                    .fileId(entity.getFileId())
                    .postId(entity.getPostId())
                    .boardType(entity.getBoardType())
                    .fileName(entity.getSaveName())
                    .originName(entity.getOriginName())
                    .fileSize(entity.getFileSize())
                    .createdAt(entity.getCreatedAt())
                    .build();
        }
    }

}
