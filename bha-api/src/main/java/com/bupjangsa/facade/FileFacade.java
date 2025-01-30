package com.bupjangsa.facade;

import com.bupjangsa.dto.AppResponse;
import com.bupjangsa.domain.file.dto.FileDto;
import com.bupjangsa.dto.request.FileRequest;
import com.bupjangsa.dto.response.FileResponse;
import com.bupjangsa.service.FileService;
import com.bupjangsa.type.BoardType;
import com.bupjangsa.util.FileComponent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import static com.bupjangsa.constant.AppConst.YYYY_MM_DD;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileFacade {

    private final FileComponent fileComponent;
    private final FileService fileService;

    /**
     * 이미지 업로드
     * @param file
     * @return
     */
    @Transactional
    public AppResponse<FileResponse.ImageInfo> registerImage(MultipartFile file) {
        FileDto.ImageInfo image = fileComponent.uploadImage(file);
        return AppResponse.responseSuccess(FileResponse.ImageInfo.from(image));
    }

    /**
     * 파일 등록
     * @param fileList
     * @param boardType
     * @param postId
     */
    @Transactional
    public AppResponse<Void> registerFile(List<MultipartFile> fileList, BoardType boardType, Long postId) {
        final List<FileDto.Register> dtoList = fileList.stream()
                .filter(Objects::nonNull)
                .map(i -> fileComponent.uploadFile(i, postId, boardType))
                .toList();

        fileService.saveFileList(dtoList);
        return AppResponse.responseVoidSuccess(HttpStatus.CREATED.value());
    }
    /**
     * 파일 삭제
     * @param fileId
     * @param request
     * @return
     */
    @Transactional
    public AppResponse<Void> deleteFile(Long fileId, FileRequest.FileInfoReq request){
        String addPath = request.getCreatedAt().toLocalDate().format(DateTimeFormatter.ofPattern(YYYY_MM_DD));
        //db 파일 삭제
        fileService.deleteFile(fileId);
        //로컬 파일 삭제
        fileComponent.deleteFile(addPath, request.getFileName());

        return AppResponse.responseVoidSuccess(HttpStatus.NO_CONTENT.value());
    }

    /**
     * 파일 리스트 조회
     * @param boardTypeStr
     * @param postId
     * @return
     */
    public AppResponse<FileResponse.FileInfoList> findFileInfoList(String boardTypeStr, Long postId) {
        BoardType boardType = BoardType.valueOf(boardTypeStr);
        List<FileDto.FileInfo> fileInfoList = fileService.findAllFileList(postId, boardType);

        final FileResponse.FileInfoList response = FileResponse.FileInfoList.from(postId, boardType, fileInfoList);
        return AppResponse.responseSuccess(response);
    }

//    /**
//     * 파일 업데이트
//     * @param fileId
//     * @param fileList
//     * @param request
//     * @return
//     */
//    @Transactional
//    public AppResponse<Void> updateFile(Long postId, List<MultipartFile> fileList, BoardType boardType) {
//        String addPath = request.getCreatedAt().toLocalDate().format(DateTimeFormatter.ofPattern(YYYY_MM_DD));
//
//        List<FileDto.FileInfo> fileInfoList = fileService.findAllFileList(postId, boardType);
//        fileInfoList.forEach(f -> {
//            fileService.deleteFile(f.getFileId());
//            fileComponent.deleteFile(addPath, f.getFileName());
//        });
//        //로컬 파일 삭제
//
//        final List<FileDto.Register> dtoList = fileList.stream()
//                .filter(Objects::nonNull)
//                .map(i -> fileComponent.uploadFile(i, postId, boardType))
//                .toList();
//
//        fileService.saveFileList(dtoList);
//
//        return AppResponse.responseVoidSuccess(HttpStatus.NO_CONTENT.value());
//    }



    /**
     * 파일 정보 조회
     * @param fileNo
     * @return
     */
    public FileResponse.FileDownload findFileInfo(Long fileNo){

        FileDto.FileInfo fileInfo = fileService.findFileInfo(fileNo);
        Resource resource = fileComponent.readFileAsResource(fileInfo);

        return FileResponse.FileDownload.builder()
                .fileName(fileInfo.getFileName())
                .fileSize(fileInfo.getFileSize())
                .resource(resource)
                .build();
    }

}
