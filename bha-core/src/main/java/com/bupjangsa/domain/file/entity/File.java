package com.bupjangsa.domain.file.entity;

import com.bupjangsa.domain.common.BaseEntity;
import com.bupjangsa.domain.post.entity.BoardBase;
import com.bupjangsa.type.BoardType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLRestriction;

@Getter
@Entity
@Table(name = "t_file")
@SuperBuilder
@SQLRestriction("deleted = false")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class File extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;

    @Column(nullable = false)
    private Long postId;

    @Column(nullable = false)
    @Convert(converter = BoardType.Converter.class)
    private BoardType boardType;

    @Column(nullable = false)
    private String originName;

    @Column(nullable = false)
    private String saveName;

    @Column
    private String thumbnailName;

    @Column
    private String thumbnailPath;

    @Column(nullable = false)
    private long fileSize;
}
