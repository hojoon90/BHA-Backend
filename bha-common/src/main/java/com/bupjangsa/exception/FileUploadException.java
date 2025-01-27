package com.bupjangsa.exception;

import com.bupjangsa.constant.MessageConst;

public class FileUploadException extends RuntimeException{

    public FileUploadException(MessageConst message) {
        super(message.getMessage());
    }
}
