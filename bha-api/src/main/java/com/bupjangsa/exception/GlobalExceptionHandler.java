package com.bupjangsa.exception;

import com.bupjangsa.common.AppResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static com.bupjangsa.constant.MessageConst.NOTNULL_PARAMETER;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 기타 예외
     * @param ex
     * @return
     */
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<AppResponse<Void>> handleException(Exception ex) {
        log.error("handleException: {}", ex.getMessage(), ex);
        return getExceptionResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());

    }

    /**
     * 사용자 인증 예외
     * @param ex
     * @return
     */
    @ExceptionHandler(AuthorizeException.class)
    protected ResponseEntity<AppResponse<Void>> handleAuthorizeException(Exception ex) {
        log.error("AuthorizeException: {}", ex.getMessage(), ex);
        return getExceptionResponseEntity(HttpStatus.UNAUTHORIZED, ex.getMessage());

    }

    /**
     * 데이터 처리 예외
     * @param ex
     * @return
     */
    @ExceptionHandler(DataProcessException.class)
    protected ResponseEntity<AppResponse<Void>> handleDataProcessException(Exception ex) {
        log.error("UserDataException: {}", ex.getMessage(), ex);
        return getExceptionResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }

    /**
     * 데이터 미존재 예외
     * @param ex
     * @return
     */
    @ExceptionHandler(NotFoundException.class)
    protected ResponseEntity<AppResponse<Void>> handleDataNotFoundException(Exception ex) {
        log.error("DataNotFoundException: {}", ex.getMessage(), ex);
        return getExceptionResponseEntity(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    /**
     * 권한 없음 예외
     * @param ex
     * @return
     */
    @ExceptionHandler(ForbiddenException.class)
    protected ResponseEntity<AppResponse<Void>> handleForbiddenException(Exception ex) {
        log.error("ForbiddenException: {}", ex.getMessage(), ex);
        return getExceptionResponseEntity(HttpStatus.FORBIDDEN, ex.getMessage());
    }

    private ResponseEntity<AppResponse<Void>> getExceptionResponseEntity(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                AppResponse.responseFail(httpStatus, message), httpStatus);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MissingServletRequestParameterException.class)
    private ResponseEntity<AppResponse<Void>> handleMissingServletRequestParameterException(Exception ex) {
        log.error("MissingServletRequestParameterException: {}", ex.getMessage(), ex);
        return getExceptionResponseEntity(HttpStatus.BAD_REQUEST, NOTNULL_PARAMETER.getMessage());
    }
}
