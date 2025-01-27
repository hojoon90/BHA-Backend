package com.bupjangsa.exception;

import com.bupjangsa.constant.MessageConst;

public class DataProcessException extends RuntimeException{

    public DataProcessException(MessageConst message) {
        super(message.getMessage());
    }
}
