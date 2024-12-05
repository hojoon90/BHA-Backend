package com.bupjangsa.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/file")
public class FileController {

    @DeleteMapping
    public void deleteFileData(){

    }


}
