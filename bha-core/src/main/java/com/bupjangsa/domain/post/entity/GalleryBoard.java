package com.bupjangsa.domain.post.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@SuperBuilder
@Entity
@Table(name = "t_gallery_board")
@SQLDelete(sql = "UPDATE t_gallery_board SET deleted = true where post_id = ?")
@SQLRestriction("deleted = false")  //삭제가 아닌 유저만 조회하도록 조건처리
@NoArgsConstructor
public class GalleryBoard extends BoardBase {

}
