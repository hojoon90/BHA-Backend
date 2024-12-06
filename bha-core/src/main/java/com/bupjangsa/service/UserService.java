package com.bupjangsa.service;

import com.bupjangsa.domain.user.dto.UserDto;
import com.bupjangsa.domain.user.entity.User;
import com.bupjangsa.domain.user.infra.UserRepository;
import com.bupjangsa.exception.DataProcessException;
import com.bupjangsa.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.bupjangsa.constant.MessageConst.USER_NOT_FOUND;

/**
 * Repository 에서 데이터 처리 후 DTO를 리턴합니다.
 *
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void registerUser(UserDto.Register userDto){
        User user = userDto.toEntity();
        Optional<User> userInfo = userRepository.findByAccountId(user.getAccountId());
        if(userInfo.isPresent()) throw new DataProcessException("이미 존재하는 유저입니다.");

        userRepository.save(user);
    }

    @Transactional
    public void updateUser(UserDto.Update userDto){
        User user = userRepository.findById(userDto.getId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND.getMessage()));

        user.updateUserData(userDto);
    }

    @Transactional
    public void deleteUser(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND.getMessage()));
        user.updateSignOutDate();
        userRepository.delete(user);
    }

    public UserDto.UserInfo findUser(Long id){
        return userRepository.findById(id)
                .map(UserDto.UserInfo::from)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND.getMessage()));
    }

    public UserDto.UserInfo findUserByAccountId(String accountId){
        return userRepository.findByAccountId(accountId)
                .map(UserDto.UserInfo::from)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND.getMessage()));
    }

}
