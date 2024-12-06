package com.bupjangsa.security.dto;

import com.bupjangsa.constant.MessageConst;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@Builder
public class AuthErrorResponse<T> {

    private final int resultCode;
    private final String resultMsg;
    private final T data;


    public static AuthErrorResponse<Void> unauthorized(){
        return AuthErrorResponse.<Void>builder()
                .resultCode(HttpStatus.UNAUTHORIZED.value())
                .resultMsg(MessageConst.UNAUTHORIZED_TOKEN.getMessage())
                .build();
    }

    public static AuthErrorResponse<Void> forbidden(){
        return AuthErrorResponse.<Void>builder()
                .resultCode(HttpStatus.FORBIDDEN.value())
                .resultMsg(MessageConst.FORBIDDEN_AUTHORIZED.getMessage())
                .build();
    }
}
