package com.bupjangsa.controller;

import com.bupjangsa.dto.AppResponse;
import com.bupjangsa.dto.request.FileRequest;
import com.bupjangsa.dto.response.FileResponse;
import com.bupjangsa.facade.FileFacade;
import com.bupjangsa.type.BoardType;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1/file")
public class FileController {

    private final FileFacade fileFacade;

    @PostMapping(value = "/image/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AppResponse<FileResponse.ImageInfo>> uploadImage(
            @RequestPart final MultipartFile file
    ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(fileFacade.registerImage(file));
    }


    @PostMapping(value = "/{boardType}/post/{postId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AppResponse<Void>> uploadFile(
            @PathVariable String boardType,
            @PathVariable Long postId,
            @RequestPart(name = "file", required = false) final List<MultipartFile> fileList
    ){
        BoardType type = BoardType.valueOf(boardType);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(fileFacade.registerFile(fileList, type, postId));
    }

    @DeleteMapping("/{fileId}")
    public ResponseEntity<AppResponse<Void>> deleteFile(
            @PathVariable Long fileId,
            @RequestBody FileRequest.FileInfoReq request
    ){
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(fileFacade.deleteFile(fileId, request));
    }

    @GetMapping("/{boardType}/post/{postId}")
    public ResponseEntity<AppResponse<FileResponse.FileInfoList>> getFlieList(
            @PathVariable String boardType,
            @PathVariable Long postId
    ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(fileFacade.findFileInfoList(boardType, postId));
    }

    @GetMapping(value = "/{fileId}/download", consumes = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<Resource> downloadFile(
            @PathVariable final Long fileId
    ) {
        FileResponse.FileDownload resource = fileFacade.findFileInfo(fileId);
        String filename = URLEncoder.encode(resource.getFileName(), StandardCharsets.UTF_8);
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; fileName=\"" + filename + "\";")
                .header(HttpHeaders.CONTENT_LENGTH, resource.getFileSize() + "")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource.getResource());
    }


}
