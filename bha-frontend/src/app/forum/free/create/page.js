"use client"

import { useState, useEffect, useRef } from 'react';
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


export default function FreeBoardEdit({initialBoardDetail}) {
    const router = useRouter();
    // const { mode } = router.query; // mode === "CREATE"
    // console.log(router)
    // console.log(mode);
    const boardType = "FREE_BOARD"; // 게시판 타입 설정
    const checkRef = useRef([]);

    // 상태 관리
    const [boardDetail, setBoardDetail] = useState(initialBoardDetail || {});
    const [boardAttachFiles, setBoardAttachFiles] = useState();

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
                    <ForumLeftbar/>
                    <BoardWrite
                        boardDetail = {boardDetail}
                        listUrl= {URL.FORUM_FREE}
                        mode={"CREATE"}
                        posblAtchFileNumber={10}
                        boardType={"FREE_BOARD"}
                    />
                </div>
            </div>
        </div>
    );
}

// // 서버사이드 데이터 로딩 (SSR)
// export async function getServerSideProps(context) {
//     const { mode, bbsId } = context.query;
//     let initialBoardDetail = {};
//
//     if (mode === CODE.MODE_MODIFY) {
//         const resp = await EgovNet.requestFetch(`/bbsMaster/${bbsId}`);
//         initialBoardDetail = resp?.result?.boardMasterVO || {};
//     }
//
//     return {
//         props: {
//             initialBoardDetail,
//             mode,
//         },
//     };
// }