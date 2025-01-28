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

import static com.bupjangsa.constant.MessageConst.USER_DATA_CONFLICT;
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
        if(userInfo.isPresent()) throw new DataProcessException(USER_DATA_CONFLICT);

        userRepository.save(user);
    }

    @Transactional
    public void updateUser(UserDto.Update userDto){
        User user = getUser(userDto.getId());
        user.updateUserData(userDto);
    }

    @Transactional
    public void deleteUser(Long id){
        User user = getUser(id);
        user.updateSignOutDate();
        userRepository.delete(user);
    }


    public UserDto.UserInfo findUser(Long id){
        User user = getUser(id);
        return UserDto.UserInfo.from(user);
    }

    public UserDto.UserInfo findUserByAccountId(String accountId){
        return userRepository.findByAccountId(accountId)
                .map(UserDto.UserInfo::from)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
    }

    private User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
    }

}
