package com.bupjangsa.domain.file.infra;

import com.bupjangsa.domain.file.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {

}
