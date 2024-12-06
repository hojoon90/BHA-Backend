package com.bupjangsa.common;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static com.bupjangsa.constant.MessageConst.RESULT_SUCCESS;

@Getter
@Builder
public final class AppResponse<T> {

    private final int resultCode;
    private final String resultMsg;
    private final T data;

    public static<T> AppResponse<T> responseSuccess(T data){
        return new AppResponse<>(HttpStatus.OK.value(),
                RESULT_SUCCESS.getMessage(), data);
    }

    public static AppResponse<Void> responseVoidSuccess(Integer statusCode){
        return new AppResponse<>(statusCode,
                RESULT_SUCCESS.getMessage(), null);
    }

    public static<T> AppResponse<T> responseFail(HttpStatus status , String message){
        return new AppResponse<>(status.value(),
                message, null);
    }

}
