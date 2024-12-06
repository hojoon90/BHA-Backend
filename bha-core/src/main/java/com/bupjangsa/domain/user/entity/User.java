package com.bupjangsa.domain.user.entity;

import com.bupjangsa.domain.common.BaseEntity;
import com.bupjangsa.domain.user.dto.UserDto;
import com.bupjangsa.type.AuthorityType;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.annotations.Where;

import java.time.LocalDate;

import static lombok.AccessLevel.PROTECTED;

@Getter
@Entity
@Table(name = "t_user")
@SQLDelete(sql = "UPDATE t_user SET deleted = true where user_id = ?")
@SQLRestriction("deleted = false")  //삭제가 아닌 유저만 조회하도록 조건처리
@NoArgsConstructor(access = PROTECTED)
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String accountId;  //이메일

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String password;

    @Enumerated
    @Column(nullable = false)
    private AuthorityType authority;

    private LocalDate signOutDate; //탈퇴 일자

    @Builder
    public User(String accountId, String userName, String password, AuthorityType authority, LocalDate signOutDate) {
        this.accountId = accountId;
        this.userName = userName;
        this.password = password;
        this.authority = authority;
        this.signOutDate = signOutDate;
    }

    public void updateUserData(UserDto.Update dto){
        this.userName = dto.getName();
    }

    public void updateSignOutDate(){
        this.signOutDate = LocalDate.now();
    }

}
