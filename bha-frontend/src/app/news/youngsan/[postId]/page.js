"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as ExtApi from '@/lib/api'; // EgovNet API 요청 함수
import URL from '@/data/url'; // URL 데이터
import CODE from '@/data/code'; // 코드 데이터
import { getSessionItem } from '@/lib/storage'; // 세션에서 로그인 사용자 정보 가져오기
import BoardDetail from '@/components/board/BoardDetail';
import Link from "next/link";
import NewsLeftbar from "@/components/leftmenu/NewsLeftbar"; // BoardDetailView 컴포넌트 import

function YoungsanDetail({ params }) {
    const postId = params.postId; // 동적 경로에서 postId 가져옴
    const boardType = "NEWS_YOUNGSAN"; // 게시판 타입 설정

    return (
        <div className="container">
            <div className="c_wrap">
                {/* Location */}
                <div className="location">
                    <ul>
                        <li><Link href={URL.HOME} className="home">Home</Link></li>
                        <li><Link href={URL.NEWS_NOTICE}>사찰 소식</Link></li>
                        <li>영산회상</li>
                    </ul>
                </div>

                <div className="layout">
                    {/* Navigation */}
                    <NewsLeftbar />
                    {/* Contents */}
                    <div className="contents NOTICE_VIEW" id="contents">
                        <div className="top_tit">
                            <h1 className="tit_1">참여마당</h1>
                        </div>
                        <h2 className="tit_2">영산회상</h2>

                        {/* 게시판 상세보기 */}
                        <BoardDetail
                            pageUrl={URL.NEWS_YOUNGSAN}
                            boardType={boardType}
                            postId={postId}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YoungsanDetail;