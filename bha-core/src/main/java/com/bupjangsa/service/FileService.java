package com.bupjangsa.service;

import com.bupjangsa.domain.file.dto.FileDto;
import com.bupjangsa.domain.file.dto.FileDto.Register;
import com.bupjangsa.domain.file.entity.File;
import com.bupjangsa.domain.file.infra.FileRepository;
import com.bupjangsa.exception.NotFoundException;
import com.bupjangsa.type.BoardType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.bupjangsa.constant.MessageConst.DATA_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;

    @Transactional
    public void saveFileList(List<Register> fileDtoList){
        fileRepository.saveAll(fileDtoList.stream().map(Register::toEntity).toList());
    }

    @Transactional
    public void saveFile(Register fileDto){
        fileRepository.save(fileDto.toEntity());
    }

    @Transactional
    public void deleteFile(Long fileNo){
        fileRepository.deleteById(fileNo);
    }

    public List<FileDto.FileInfo> findAllFileList(Long postId, BoardType boardType) {
        List<File> entityList = fileRepository.findAllByPostIdAndBoardType(postId, boardType)
                .orElseThrow(() -> new NotFoundException(DATA_NOT_FOUND));

        return entityList.stream()
                .map(FileDto.FileInfo::from)
                .toList();
    }

    public FileDto.FileInfo findFileInfo(Long fileId){
        File file = fileRepository.findById(fileId)
                .orElseThrow(() -> new NotFoundException(DATA_NOT_FOUND));

        return FileDto.FileInfo.from(file);
    }


}
