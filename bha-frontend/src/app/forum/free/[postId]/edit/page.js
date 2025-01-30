"use client"

import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import URL from '@/data/url';
import CODE from '@/data/code';
import { getSessionItem } from '@/lib/storage'; // 세션에서 로그인 사용자 정보 가져오기
import BoardDetail from '@/components/board/BoardDetail';
import Link from "next/link";
import ForumLeftbar from "@/components/leftmenu/ForumLeftbar";
import * as ExtApi from "@/lib/api";
import 'react-quill/dist/quill.snow.css';
import BoardWrite from "@/components/board/BoardWrite";
import {fetchPostById} from "@/lib/api";

export default function FreeBoardModify({ params }) {
    const router = useRouter();
    const postId = params.postId; // 동적 경로에서 postId 가져옴

    // 상태 관리
    // const [boardDetail, setBoardDetail] = useState(initialBoardDetail || {});
    // const [isLoading, setIsLoading] = useState(true);


    // 게시물 조회 API 호출
    useEffect(() => {
        if (postId) {
            ExtApi.fetchPostById("FREE_BOARD", postId)
                .then((response) => {
                    setBoardDetail(response.data); // API 응답 데이터를 상태에 저장
                })
                .catch((error) => {
                    console.error('게시물 조회 실패:', error);
                });
        }
    }, [postId]);

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
                    {/* 페이지 구조 */}
                    <ForumLeftbar />
                    <BoardWrite
                        boardDetail={boardDetail}
                        listUrl={URL.FORUM_FREE}
                        mode={"MODIFY"}
                        posblAtchFileNumber={10}
                        boardType={"FREE_BOARD"}
                    />
                </div>
            </div>
        </div>
    );
}