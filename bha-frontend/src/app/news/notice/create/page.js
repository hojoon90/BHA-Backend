"use client"

import URL from '@/data/url';
import Link from "next/link";
import 'react-quill/dist/quill.snow.css';
import BoardWrite from "@/components/board/BoardWrite";
import NewsLeftbar from "@/components/leftmenu/NewsLeftbar";


export default function NoticeCreate({}) {
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
                    {/* 페이지 구조 */}
                    <NewsLeftbar/>
                    <BoardWrite
                        listUrl= {URL.NEWS_NOTICE}
                        mode={"CREATE"}
                        posblAtchFileNumber={10}
                        boardType={boardType}
                    />
                </div>
            </div>
        </div>
    );
}
