import Link from 'next/link';
import { formatDate } from '@/lib/util';
import * as ExtApi from "@/lib/api";
import CODE from "@/data/code";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {getSessionItem} from "@/lib/storage"; // 날짜 포맷 함수

function BoardDetail({ pageUrl, boardType, postId}) {
    const router = useRouter();
    const [boardDetail, setBoardDetail] = useState({});
    const [sessionUniqId, setSessionUniqId] = useState(null); // 세션 값 상태로 관리

    const retrieveDetail = async () => {
        try {
            const response = await ExtApi.fetchPostById(boardType, postId);
            setBoardDetail(response.data);
        } catch (error) {
            console.error('게시글 상세 조회 오류:', error);
        }
    };

    const onClickDeleteBoardArticle = async () => {
        const postData = { postId: postId };
        try {
            const response = await ExtApi.deletePost(postData);
            if (response.resultCode === CODE.RCV_SUCCESS) {
                alert('게시글이 삭제되었습니다.');
                router.push(pageUrl);  // 삭제 후 목록 페이지로 이동
            } else {
                alert('게시글 삭제 실패');
            }
        } catch (error) {
            console.error('게시글 삭제 오류:', error);
        }
    };

    useEffect(() => {
        if (postId) {
            retrieveDetail();
        }
    }, [postId]);


    // 세션에서 사용자 정보 가져오기
    useEffect(() => {
        const sessionUser = getSessionItem('loginUser');
        setSessionUniqId(sessionUser?.accountId); // 세션 정보 로드 후 상태 업데이트
    }, []);

    // 로그인 상태 확인 함수 (예시)
    const isLoggedIn = () => {
        // 여기서 로그인 상태를 확인하는 로직을 추가합니다.
        // 예: localStorage나 쿠키에서 토큰 확인
        const token = getSessionItem('accessToken'); // 예시
        return !!token; // 토큰이 있으면 true, 없으면 false
    };

    if (sessionUniqId === null) {
        return <div>Loading...</div>; // 세션 정보가 로드되기 전에는 로딩 화면 표시
    }

    return (
        <div className="board_view">
            <div className="board_view_top">
                <div className="tit">{boardDetail?.title}</div>
                <div className="info">
                    <dl>
                        <dt className="writer">작성자</dt>
                        <dd>{boardDetail?.createdBy}</dd>
                    </dl>
                    <dl>
                        <dd>{boardDetail?.createdAt ? formatDate(boardDetail?.createdAt) : ''}</dd>
                    </dl>
                    <dl>
                        <dt>조회</dt>
                        <dd>{boardDetail?.viewCnt || 0}</dd>
                    </dl>
                </div>
            </div>

            {/* 첨부파일 컴포넌트 */}
            <div className="board_attach">
                {/* 첨부파일 컴포넌트 */}
                {/* EgovImageGallery 컴포넌트를 사용하여 이미지 갤러리 표시 */}
            </div>

            <div className="board_article">
                <div dangerouslySetInnerHTML={{__html: boardDetail?.contents}} style={{cols: "30", rows: "10", readOnly: true}}></div>
            </div>

            {/* 게시글 수정/삭제 버튼 */}
            <div className="board_btn_area">
                {sessionUniqId === boardDetail?.createdBy && (
                    <div className="left_col btn3">
                        <Link
                            href={ `${pageUrl}/${postId}/edit` /*, query: { postId} */}
                            className="btn btn_skyblue_h46 w_100"
                        >
                            수정
                        </Link>
                        <a
                            href="#!"
                            className="btn btn_skyblue_h46 w_100"
                            onClick={onClickDeleteBoardArticle}
                        >
                            삭제
                        </a>
                    </div>
                )}
                <div className="right_col btn1">
                    <Link href={pageUrl} className="btn btn_blue_h46 w_100">
                        목록
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BoardDetail;