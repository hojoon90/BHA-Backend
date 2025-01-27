package com.bupjangsa.controller;

import com.bupjangsa.dto.AppResponse;
import com.bupjangsa.security.dto.AppUserDetails;
import com.bupjangsa.facade.UserFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import static com.bupjangsa.dto.request.UserRequest.*;
import static com.bupjangsa.dto.response.UserResponse.TokenResponse;
import static com.bupjangsa.dto.response.UserResponse.UserDetail;

@RestController
@RequestMapping(value = "/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserFacade userFacade;

    //사용자 가입
    @PostMapping
    public ResponseEntity<AppResponse<Void>> registerUser(
            @RequestBody final RegisterRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userFacade.registUser(request));
    }

    /**
     * 회원 로그인
     *
     * @param request
     * @return
     */
    @PostMapping(value = "/login")
    public ResponseEntity<AppResponse<TokenResponse>> getUser(
            @RequestBody LoginRequest request
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(userFacade.login(request));
    }


    //회원정보 수정
    @PutMapping
    public ResponseEntity<AppResponse<Void>> updateUser(
            @AuthenticationPrincipal AppUserDetails user,
            @RequestBody final UpdateRequest request
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(userFacade.updateUser(user.getUserId(), request));
    }

    //회원 탈퇴
    @DeleteMapping
    public ResponseEntity<AppResponse<Void>> deleteUser(
            @AuthenticationPrincipal AppUserDetails user
    ) {
        //회원탈퇴의 경우 탈퇴여부값만 변경해준다.
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(userFacade.deleteUser(user.getUserId()));
    }

    //회원 조회
    @GetMapping
    public ResponseEntity<AppResponse<UserDetail>> getUser(
            @AuthenticationPrincipal AppUserDetails user
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(userFacade.findUser(user.getUserId()));
    }

}
