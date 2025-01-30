"use client"

import URL from '@/data/url';
import Link from "next/link";
import ForumLeftbar from "@/components/leftmenu/ForumLeftbar";
import 'react-quill/dist/quill.snow.css';
import BoardWrite from "@/components/board/BoardWrite";


export default function FreeBoardCreate({initialBoardDetail}) {
    const boardType = "FREE_BOARD"; // 게시판 타입 설정

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
                        listUrl= {URL.FORUM_FREE}
                        mode={"CREATE"}
                        posblAtchFileNumber={10}
                        boardType={boardType}
                    />
                </div>
            </div>
        </div>
    );
}
