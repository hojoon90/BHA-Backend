package com.bupjangsa.domain.post.entity;


import com.bupjangsa.domain.common.BaseEntity;
import com.bupjangsa.type.BoardType;
import com.bupjangsa.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;


@Getter
@SuperBuilder
@Entity
@Table(name = "t_free_board")
@SQLDelete(sql = "UPDATE t_free_board SET deleted = true where post_id = ?")
@Where(clause = "deleted = false")  //삭제가 아닌 유저만 조회하도록 조건처리
@NoArgsConstructor
public class FreeBoard extends BoardBase {

}
