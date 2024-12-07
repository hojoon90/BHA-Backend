package com.bupjangsa.domain.post.entity;

import com.bupjangsa.domain.common.BaseEntity;
import com.bupjangsa.domain.file.entity.File;
import com.bupjangsa.domain.user.entity.User;
import com.bupjangsa.type.BoardType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@MappedSuperclass  // 공통 속성을 상속할 수 있도록 설정
public abstract class BoardBase extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Lob
    private String contents;

    @Column
    @ColumnDefault("0")
    private Long viewCnt;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "last_modified_by")
    private User lastModifiedBy;

    public void updatePostData(String title, String contents, User user) {
        this.title = title;
        this.contents = contents;
        this.lastModifiedBy = user;
    }

    public void updateViewCnt(){
        this.viewCnt++;
    }
}