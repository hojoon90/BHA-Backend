import Link from 'next/link';
import URL from '@/data/url';
import { formatDate } from '@/lib/util'; // 날짜 포맷 함수

function BoardDetail({ boardDetail, onClickDeleteBoardArticle,
                         sessionUniqId, boardUrl, postId}) {
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
                            href={ `${URL.NEWS_YOUNGSAN}/${postId}/edit` /*, query: { postId} */}
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
                    <Link href={boardUrl} className="btn btn_blue_h46 w_100">
                        목록
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BoardDetail;