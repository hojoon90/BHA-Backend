package com.bupjangsa.exception;

import com.bupjangsa.constant.MessageConst;
import lombok.Getter;

@Getter
public class AuthorizeException extends RuntimeException{

    public AuthorizeException(MessageConst message) {
        super(message.getMessage());
    }
}
