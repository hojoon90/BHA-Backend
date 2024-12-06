package com.bupjangsa.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MessageConst {
    //SuccessCode
    //200
    RESULT_SUCCESS("OK"),

    //ErrorCode
    //400
    WRONG_PASSWORD("패스워드가 일치하지 않습니다."),
    NOTNULL_PARAMETER("파라미터는 Null 일 수 없습니다."),
    QUOTE_EXPIRED("견적서가 만료 되었습니다."),
    LIMIT_EXCESS("오늘 송금 한도 초과 입니다."),

    //401
    UNAUTHORIZED_TOKEN("사용할 수 없는 토큰입니다."),

    //403
    FORBIDDEN_AUTHORIZED("권한이 없습니다."),

    //404
    USER_NOT_FOUND("사용자를 찾을 수 없습니다."),
    POST_NOT_FOUND("게시물을 찾을 수 없습니다."),

    //500
    UNKNOWN_ERROR("알 수 없는 에러 입니다."),

    //503
    EXTERNAL_API_ERROR("외부 API 오류입니다. ");

    private final String message;

    public String getMessage(Object... arg) {
        return String.format(message, arg);
    }
}

