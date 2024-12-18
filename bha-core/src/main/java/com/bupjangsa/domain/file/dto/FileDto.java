package com.bupjangsa.domain.file.dto;

import com.bupjangsa.domain.file.entity.File;
import com.bupjangsa.type.BoardType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
        private String thumbName;

        public static FileInfo from(File entity) {
            return FileInfo.builder()
                    .fileId(entity.getFileId())
                    .postId(entity.getPostId())
                    .boardType(entity.getBoardType())
                    .fileName(entity.getSaveName())
                    .thumbName(entity.getThumbName())
                    .build();
        }
    }

}
