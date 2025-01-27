package com.bupjangsa.exception;

import com.bupjangsa.constant.MessageConst;

public class NotFoundException extends RuntimeException {
    public NotFoundException(MessageConst message) {
        super(message.getMessage());
    }
}
