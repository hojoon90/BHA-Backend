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
        private String thumbnailName;
        private String thumbnailPath;
        private long fileSize;

        public void setThumbnailInfo(String thumbnailName, String thumbnailPath){
            this.thumbnailName = thumbnailName;
            this.thumbnailPath = thumbnailPath;
        }

        public File toEntity(){
            return File.builder()
                    .postId(postId)
                    .boardType(boardType)
                    .originName(originName)
                    .saveName(saveName)
                    .fileSize(fileSize)
                    .thumbnailName(thumbnailName)
                    .thumbnailPath(thumbnailPath)
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

    @Getter
    @Builder
    public static class ImageInfo{
        private String imagePath;
        private String thumbnailPath;
        private long fileSize;
        //        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime createdAt;

        public static ImageInfo from(File entity) {
            return ImageInfo.builder()
                    .build();
        }
    }

}
