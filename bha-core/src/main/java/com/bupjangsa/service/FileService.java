package com.bupjangsa.service;

import com.bupjangsa.domain.file.dto.FileDto;
import com.bupjangsa.domain.file.dto.FileDto.Register;
import com.bupjangsa.domain.file.entity.File;
import com.bupjangsa.domain.file.infra.FileRepository;
import com.bupjangsa.type.BoardType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;

    public void saveFile(List<Register> fileDtoList){
        fileRepository.saveAll(fileDtoList.stream().map(Register::toEntity).toList());
    }

    public List<FileDto.FileInfo> findAllFileList(Long postId, BoardType boardType){
        List<File> entityList = fileRepository.findAllByPostIdAndBoardType(postId, boardType)
                .orElse(Collections.emptyList());

        return entityList.stream()
                .map(FileDto.FileInfo::from)
                .toList();
    }


}
