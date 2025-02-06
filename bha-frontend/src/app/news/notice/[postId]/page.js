"use client"

import URL from '@/data/url'; // URL 데이터
import BoardDetail from '@/components/board/BoardDetail';
import Link from "next/link";
import NewsLeftbar from "@/components/leftmenu/NewsLeftbar"; // BoardDetailView 컴포넌트 import

function NoticeDetail({ params }) {
    const postId = params.postId; // 동적 경로에서 postId 가져옴
    const boardType = "NEWS_NOTICE"; // 게시판 타입 설정

    return (
        <div className="container">
            <div className="c_wrap">
                {/* Location */}
                <div className="location">
                    <ul>
                        <li><Link href={URL.HOME} className="home">Home</Link></li>
                        <li><Link href={URL.NEWS_NOTICE}>사찰 소식</Link></li>
                        <li>공지사항</li>
                    </ul>
                </div>

                <div className="layout">
                    {/* Navigation */}
                    <NewsLeftbar />
                    {/* Contents */}
                    <div className="contents NOTICE_VIEW" id="contents">
                        <div className="top_tit">
                            <h1 className="tit_1">사찰 소식</h1>
                        </div>
                        <h2 className="tit_2">공지사항</h2>

                        {/* 게시판 상세보기 */}
                        <BoardDetail
                            pageUrl={URL.NEWS_NOTICE}
                            boardType={boardType}
                            postId={postId}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoticeDetail;