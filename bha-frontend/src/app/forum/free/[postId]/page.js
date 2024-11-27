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

function FreeBoardDetail({ params }) {
    const router = useRouter();
    const postId = params.postId; // 동적 경로에서 postId 가져옴
    const boardType = "FREE_BOARD"; // 게시판 타입 설정

    const [sessionUniqId, setSessionUniqId] = useState(null); // 세션 값 상태로 관리
    const [boardDetail, setBoardDetail] = useState({});

    // 세션에서 사용자 정보 가져오기
    useEffect(() => {
        const sessionUser = getSessionItem('loginUser');
        setSessionUniqId(sessionUser?.accountId); // 세션 정보 로드 후 상태 업데이트
    }, []);

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
                router.push(URL.NEWS);  // 삭제 후 목록 페이지로 이동
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

    if (sessionUniqId === null) {
        return <div>Loading...</div>; // 세션 정보가 로드되기 전에는 로딩 화면 표시
    }

    return (
        <div className="container">
            <div className="c_wrap">
                {/* Location */}
                <div className="location">
                    <ul>
                        <li><Link href={URL.HOME} className="home">Home</Link></li>
                        <li><Link href={URL.NEWS_NOTICE}>참여마당</Link></li>
                        <li>자유게시판</li>
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
                        <h2 className="tit_2">자유게시판</h2>

                        {/* 게시판 상세보기 */}
                        <BoardDetail
                            boardDetail={boardDetail}
                            onClickDeleteBoardArticle={onClickDeleteBoardArticle}
                            sessionUniqId={sessionUniqId}
                            postId={postId}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FreeBoardDetail;