package com.bupjangsa.util;

import com.bupjangsa.domain.file.dto.FileDto;
import com.bupjangsa.service.FileService;
import com.bupjangsa.type.BoardType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class FileUtil {

    private final FileService fileService;

    private static final String uploadPath = "";

    @Transactional
    public void registerFile(List<MultipartFile> fileList, Long postId, BoardType boardType) {
        final List<FileDto.Register> dtoList = fileList.stream()
                .filter(Objects::nonNull)
                .map(i -> uploadFile(i, postId, boardType))
                .toList();

        fileService.saveFile(dtoList);
    }

    /**
     * 단일 파일 업로드
     * @param file - 파일 객체
     * @return DB에 저장할 파일 정보
     */
    public FileDto.Register uploadFile(final MultipartFile file, Long postId, BoardType boardType) {

        String saveName = generateSaveFilename(file.getOriginalFilename());
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String uploadPath = getUploadPath(today) + File.separator + saveName;
        File uploadFile = new File(uploadPath);


        try {
            file.transferTo(uploadFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return FileDto.Register.builder()
                .postId(postId)
                .boardType(boardType)
                .saveName(generateSaveFilename(file.getOriginalFilename()))
                .originName(file.getOriginalFilename())
                .fileSize(file.getSize())
                .build();
    }

    /**
     * 저장 파일명 생성
     * @param filename 원본 파일명
     * @return 디스크에 저장할 파일명
     */
    private String generateSaveFilename(final String filename) {
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        String extension = StringUtils.getFilenameExtension(filename);
        return uuid + "." + extension;
    }

    /**
     * 업로드 경로 반환
     * @param addPath - 추가 경로
     * @return 업로드 경로
     */
    private String getUploadPath(final String addPath) {
        return makeDirectories(uploadPath + File.separator + addPath);
    }

    /**
     * 업로드 폴더(디렉터리) 생성
     * @param path - 업로드 경로
     * @return 업로드 경로
     */
    private String makeDirectories(final String path) {
        File dir = new File(path);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        return dir.getPath();
    }



}
