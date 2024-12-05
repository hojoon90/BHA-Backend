package com.bupjangsa.service;

import com.bupjangsa.domain.file.dto.FileDto.Register;
import com.bupjangsa.domain.file.infra.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;

    public void saveFile(List<Register> fileDtoList){
        fileRepository.saveAll(fileDtoList.stream().map(Register::toEntity).toList());
    }


}
