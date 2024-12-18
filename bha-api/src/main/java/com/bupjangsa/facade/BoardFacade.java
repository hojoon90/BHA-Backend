package com.bupjangsa.facade;

import com.bupjangsa.common.AppResponse;
import com.bupjangsa.domain.post.dto.PostCriteria;
import com.bupjangsa.domain.post.dto.PostDto;
import com.bupjangsa.service.PostService;
import com.bupjangsa.type.BoardType;
import com.bupjangsa.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.bupjangsa.domain.post.dto.PostDto.*;
import static com.bupjangsa.dto.request.BoardRequest.*;
import static com.bupjangsa.dto.response.BoardResponse.PostDetail;
import static com.bupjangsa.dto.response.BoardResponse.PostPage;

/**
 * Facade 는 아래 역할만 수행한다.
 *
 * DTO -> Entity 변환처리
 * Entity -> DTO 변환처리
 */
@Service
@RequiredArgsConstructor
public class BoardFacade {

    private final List<PostService> postServiceList;
    private final FileUtil fileUtil;

    /**
     * 게시물 등록
     * @param userId
     * @param request
     * @return
     */
    public AppResponse<Void> registerPost(Long userId, PostRegisterRequest request, List<MultipartFile> fileList){

        Register register = Register.builder()
                .title(request.getTitle())
                .boardType(request.getBoardType())
                .contents(request.getContents())
                .userId(userId)
                .build();

        PostService postService = postServiceList.stream().filter(i -> i.isValidService(request.getBoardType()))
                        .findFirst().orElseThrow(() -> new RuntimeException(""));

        //파일 저장 처리
        Long postId = postService.registerPost(register);
        fileUtil.registerFile(fileList, postId, request.getBoardType());

        return AppResponse.responseVoidSuccess(HttpStatus.CREATED.value());
    }



    /**
     * 게시물 업데이트
     * @param userId
     * @param request
     * @return
     */
    public AppResponse<Void> updatePost(Long userId, PostUpdateRequest request){

        Update update = Update.builder()
                .postId(request.getPostId())
                .title(request.getTitle())
                .contents(request.getContents())
                .boardType(request.getBoardType())
                .userId(userId)
                .build();

        PostService postService = postServiceList.stream().filter(i -> i.isValidService(request.getBoardType()))
                .findFirst().orElseThrow(() -> new RuntimeException(""));

        postService.updatePost(update);
        return AppResponse.responseVoidSuccess(HttpStatus.OK.value());
    }

    /**
     * 게시물 삭제
     * @param userId
     * @param request
     * @return
     */
    public AppResponse<Void> deletePost(Long userId, PostDeleteRequest request){

        Delete delete = Delete.builder()
                .postId(request.getPostId())
                .boardType(request.getBoardType())
                .userId(userId)
                .build();

        PostService postService = postServiceList.stream().filter(i -> i.isValidService(request.getBoardType()))
                .findFirst().orElseThrow(() -> new RuntimeException(""));

        postService.deletePost(delete);
        return AppResponse.responseVoidSuccess(HttpStatus.NO_CONTENT.value());
    }

    /**
     * 게시물 조회
     * @param boardTypeStr
     * @param postId
     * @return
     */
    public AppResponse<PostDetail> selectPost(String boardTypeStr, Long postId){

        BoardType boardType = BoardType.valueOf(boardTypeStr);

        PostService postService = postServiceList.stream().filter(i -> i.isValidService(boardType))
                .findFirst().orElseThrow(() -> new RuntimeException(""));

        final PostDto.PostDetail postDetail = postService.selectPost(postId);
        //TODO 파일 조회(cdn url 세팅후 리턴 처리)

        return AppResponse.responseSuccess(com.bupjangsa.dto.response.BoardResponse.PostDetail.from(postDetail));
    }

    /**
     * 게시판 리스트 조회
     * @param request
     * @return
     */
    public AppResponse<PostPage> selectPostList(PageablePostSearchRequest request){
        final PostCriteria.SearchList criteria = PostCriteria.SearchList.builder()
                .boardType(BoardType.valueOf(request.getBoardType()))
                .build();

        PostService postService = postServiceList.stream().filter(i -> i.isValidService(BoardType.valueOf(request.getBoardType())))
                .findFirst().orElseThrow(() -> new RuntimeException(""));

        Page<PostDto.PostSummary> postInfos = postService.selectPostList(criteria, request.getPageRequest());

        final PostPage page = PostPage.of(postInfos.getTotalElements(), postInfos.getTotalPages()
                , postInfos.getPageable().getPageSize(), postInfos.getContent());
        return AppResponse.responseSuccess(page);
    }

}
