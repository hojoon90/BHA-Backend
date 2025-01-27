package com.bupjangsa.facade;

import com.bupjangsa.dto.AppResponse;
import com.bupjangsa.domain.user.dto.UserDto;
import com.bupjangsa.security.dto.JwtDto;
import com.bupjangsa.exception.AuthorizeException;
import com.bupjangsa.security.service.BhaSecurityService;
import com.bupjangsa.security.service.PasswordComponent;
import com.bupjangsa.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.bupjangsa.dto.request.UserRequest.*;
import static com.bupjangsa.dto.response.UserResponse.*;
import static com.bupjangsa.constant.MessageConst.WRONG_PASSWORD;

/**
 * Facade 는 아래 역할만 수행한다.
 *
 * DTO -> Entity 변환처리
 * Entity -> DTO 변환처리
 */
@Service
@RequiredArgsConstructor
public class UserFacade {

    private final UserService userService;
    private final BhaSecurityService bhaSecurityService;
    private final PasswordComponent passwordComponent;

    /**
     * 회원 가입 메서드
     * TODO 이메일 인증 방식 필요
     * @param request
     * @return
     */
    @Transactional
    public AppResponse<Void> registUser(RegisterRequest request){

        String encodePassword = passwordComponent.encodePassword(request.getPassword());
        UserDto.Register dto = UserDto.Register.builder()
                .accountId(request.getAccountId())
                .password(encodePassword)
                .userName(request.getName())
                .build();

        userService.registerUser(dto);
        return AppResponse.responseVoidSuccess(HttpStatus.CREATED.value());
    }

    /**
     * 회원 정보 수정 메서드
     * @param userId
     * @param request
     * @return
     */
    @Transactional
    public AppResponse<Void> updateUser(Long userId, UpdateRequest request) {

        UserDto.Update dto = UserDto.Update.builder()
                .id(userId)
                .name(request.getName())
                .build();

        userService.updateUser(dto);
        return AppResponse.responseVoidSuccess(HttpStatus.OK.value());
    }

    /**
     * 회원 탈퇴 메서드
     * @param userId
     * @return
     */
    public AppResponse<Void> deleteUser(Long userId){

        userService.deleteUser(userId);
        return AppResponse.responseVoidSuccess(HttpStatus.NO_CONTENT.value());
    }


    /**
     * 회원 정보 조회 메서드
     * @param userId
     * @return
     */
    public AppResponse<UserDetail> findUser(Long userId){

        final UserDto.UserInfo user = userService.findUser(userId);
        return AppResponse.responseSuccess(UserDetail.from(user));
    }

    /**
     * 로그인 처리
     * @param request
     * @return
     */
    public AppResponse<TokenResponse> login(LoginRequest request){

        UserDto.UserInfo userDto = userService.findUserByAccountId(request.getAccountId());
        boolean checkPassword = passwordComponent.checkUserValidation(request.getPassword(), userDto.getPassword());
        if(!checkPassword) throw new AuthorizeException(WRONG_PASSWORD.getMessage());

        final JwtDto.Tokens tokens = bhaSecurityService.getTokens(userDto.getUserId(), userDto.getAccountId(), userDto.getAuthority());
        return AppResponse.responseSuccess(TokenResponse.from(tokens));
    }

}
