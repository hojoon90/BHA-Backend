package com.bupjangsa.dto.request;

import com.bupjangsa.type.BoardType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FileRequest {

    @Getter
    @Builder
    public static class FileDeleteRequest{
        private long id;
        private long postId;
        private BoardType boardType;
        private String originName;
        private String saveName;
        private long fileSize;
    }



}
