package com.bupjangsa.dto.response;

import com.bupjangsa.domain.file.dto.FileDto;
import com.bupjangsa.type.BoardType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.core.io.Resource;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FileResponse {


    @Getter
    @Builder
    public static class FileInfoList{
        private BoardType boardType;
        private Long postNo;
        private List<FileInfo> fileList;

        public static FileInfoList from(Long postNo, BoardType boardType, List<FileDto.FileInfo> fileInfoList){
            List<FileInfo> fileList = fileInfoList
                    .stream().map(FileInfo::from).toList();

            return FileInfoList.builder()
                    .postNo(postNo)
                    .boardType(boardType)
                    .fileList(fileList)
                    .build();
        }
    }

    @Getter
    @Builder
    public static class FileInfo{
        private Long fileNo;
        private String fileName;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime createdAt;

        public static FileInfo from(FileDto.FileInfo dto){
            return FileInfo.builder()
                    .fileNo(dto.getFileId())
                    .fileName(dto.getFileName())
                    .createdAt(dto.getCreatedAt())
                    .build();
        }
    }

    @Getter
    @Builder
    public static class FileDownload{
        private String fileName;
        private long fileSize;
        private Resource resource;

    }

}
