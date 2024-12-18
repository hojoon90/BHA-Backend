package com.bupjangsa.service.postService;

import com.bupjangsa.domain.file.dto.FileDto;
import com.bupjangsa.domain.post.dto.PostCriteria;
import com.bupjangsa.domain.post.dto.PostDto;
import com.bupjangsa.domain.post.entity.FreeBoard;
import com.bupjangsa.domain.post.entity.GalleryBoard;
import com.bupjangsa.domain.post.infra.component.PostFactory;
import com.bupjangsa.domain.post.infra.repository.board.GalleryBoardRepository;
import com.bupjangsa.domain.user.entity.User;
import com.bupjangsa.domain.user.infra.UserRepository;
import com.bupjangsa.exception.ForbiddenException;
import com.bupjangsa.exception.NotFoundException;
import com.bupjangsa.service.FileService;
import com.bupjangsa.service.PostService;
import com.bupjangsa.type.BoardType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.bupjangsa.constant.MessageConst.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GalleryService implements PostService {

    private final GalleryBoardRepository galleryBoardRepository;
    private final UserRepository userRepository;
    private final List<PostFactory> postFactoryList;
    private final FileService fileService;

    @Override
    public boolean isValidService(BoardType boardType) {
        return boardType.equals(BoardType.GALLERY);
    }

    @Override
    public Long registerPost(PostDto.Register boardDto) {
        User user = userRepository.findById(boardDto.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND.getMessage()));

        PostFactory factory = postFactoryList.stream()
                .filter(i -> i.selectFactory(boardDto.getBoardType())).findFirst().orElseThrow(() -> new RuntimeException(""));

        GalleryBoard entity = Optional.ofNullable(boardDto.toEntity(factory, user))
                .filter(FreeBoard.class::isInstance)
                .map(GalleryBoard.class::cast)
                .orElseThrow(() -> new IllegalArgumentException("생성된 객체는 GalleryBoard가 아닙니다."));

        return galleryBoardRepository.save(entity).getPostId();
    }

    @Override
    public void updatePost(PostDto.Update boardDto) {
        User user = userRepository.findById(boardDto.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND.getMessage()));

        GalleryBoard post = galleryBoardRepository.findById(boardDto.getPostId())
                .orElseThrow(() -> new NotFoundException(POST_NOT_FOUND.getMessage()));

        post.updatePostData(boardDto.getTitle(), boardDto.getContents(), user);
    }

    @Override
    public void deletePost(PostDto.Delete boardDto) {
        User user = userRepository.findById(boardDto.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND.getMessage()));

        GalleryBoard post = galleryBoardRepository.findById(boardDto.getPostId())
                .orElseThrow(() -> new NotFoundException(POST_NOT_FOUND.getMessage()));

        //등록자가 아닐 경우 예외처리
        if(!post.getCreatedBy().getAccountId().equals(user.getAccountId())){
            throw new ForbiddenException(FORBIDDEN_AUTHORIZED.getMessage());
        }

        galleryBoardRepository.delete(post);
    }

    @Override
    public PostDto.PostDetail selectPost(Long postId) {
        GalleryBoard galleryBoard = galleryBoardRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(POST_NOT_FOUND.getMessage()));
        //조회수 증가
        galleryBoard.updateViewCnt();

        List<FileDto.FileInfo> fileList = fileService.findAllFileList(postId, BoardType.GALLERY);
        return PostDto.PostDetail.from(galleryBoard, fileList);

    }

    @Override
    public Page<PostDto.PostSummary> selectPostList(PostCriteria.SearchList criteria, Pageable pageable) {
        Page<FreeBoard> boardPage = galleryBoardRepository.selectFreeBoardPage(criteria, pageable);

        final List<PostDto.PostSummary> boardInfoList = boardPage.getContent().stream()
                .map(PostDto.PostSummary::from)
                .toList();

        return new PageImpl<>(boardInfoList, pageable, boardPage.getTotalElements());
    }
}
