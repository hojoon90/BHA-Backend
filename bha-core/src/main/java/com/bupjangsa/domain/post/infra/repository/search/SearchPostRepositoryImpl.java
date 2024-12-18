package com.bupjangsa.domain.post.infra.repository.search;

import com.bupjangsa.domain.post.dto.PostCriteria;
import com.bupjangsa.domain.post.entity.*;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.bupjangsa.domain.post.entity.QFreeBoard.freeBoard;
import static com.bupjangsa.domain.post.entity.QGalleryBoard.galleryBoard;
import static com.bupjangsa.domain.post.entity.QNewsBoard.newsBoard;
import static com.bupjangsa.domain.post.entity.QNoticeBoard.noticeBoard;
import static com.bupjangsa.domain.post.entity.QYoungsanBoard.youngsanBoard;

@Repository
public class SearchPostRepositoryImpl extends QuerydslRepositorySupport
        implements SearchPostRepository {

    private final JPAQueryFactory queryFactory;

    public SearchPostRepositoryImpl(JPAQueryFactory queryFactory) {
        super(FreeBoard.class);
        this.queryFactory = queryFactory;
    }

    @Override
    public Page<FreeBoard> selectFreeBoardPage(PostCriteria.SearchList criteria,
                                     Pageable pageable) {
        final JPQLQuery<FreeBoard> query = queryFactory.selectFrom(freeBoard)
                .orderBy(freeBoard.postId.desc());

        final long total_count = query.fetch().size();
        final List<FreeBoard> postList = getQuerydsl().applyPagination(pageable, query).fetch();

        return new PageImpl<>(postList, pageable, total_count);
    }

    @Override
    public Page<YoungsanBoard> selectYoungsanPage(PostCriteria.SearchList criteria, Pageable pageable) {
        final JPQLQuery<YoungsanBoard> query = queryFactory.selectFrom(youngsanBoard)
                .orderBy(youngsanBoard.postId.desc());

        final long total_count = query.fetch().size();
        final List<YoungsanBoard> postList = getQuerydsl().applyPagination(pageable, query).fetch();

        return new PageImpl<>(postList, pageable, total_count);
    }

    @Override
    public Page<NoticeBoard> selectNoticePage(PostCriteria.SearchList criteria, Pageable pageable) {
        final JPQLQuery<NoticeBoard> query = queryFactory.selectFrom(noticeBoard)
                .orderBy(noticeBoard.postId.desc());

        final long total_count = query.fetch().size();
        final List<NoticeBoard> postList = getQuerydsl().applyPagination(pageable, query).fetch();

        return new PageImpl<>(postList, pageable, total_count);
    }

    @Override
    public Page<NewsBoard> selectNewsPage(PostCriteria.SearchList criteria, Pageable pageable) {
        final JPQLQuery<NewsBoard> query = queryFactory.selectFrom(newsBoard)
                .orderBy(newsBoard.postId.desc());

        final long total_count = query.fetch().size();
        final List<NewsBoard> postList = getQuerydsl().applyPagination(pageable, query).fetch();

        return new PageImpl<>(postList, pageable, total_count);
    }

    @Override
    public Page<GalleryBoard> selectGalleryPage(PostCriteria.SearchList criteria, Pageable pageable) {
        final JPQLQuery<GalleryBoard> query = queryFactory.selectFrom(galleryBoard)
                .orderBy(newsBoard.postId.desc());

        final long total_count = query.fetch().size();
        final List<GalleryBoard> postList = getQuerydsl().applyPagination(pageable, query).fetch();

        return new PageImpl<>(postList, pageable, total_count);
    }
}
