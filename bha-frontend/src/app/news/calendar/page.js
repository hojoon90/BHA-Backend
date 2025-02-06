"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import * as ExtApi from "@/lib/api";
import URL from "@/data/url";
import CODE from "@/data/code";
import NewsLeftbar from "@/components/leftmenu/NewsLeftbar";
import { getSessionItem } from "@/lib/storage";
import BoardCalendar from "@/components/board/BoardCalendar";

function NewsCalendarList() {

    return (
        <div className="container">
            <div className="c_wrap">
                <div className="location">
                    <ul>
                        <li>
                            <Link href={URL.HOME} className="home">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href={URL.NEWS_NOTICE}>사찰 소식</Link>
                        </li>
                        <li>사찰 일정</li>
                    </ul>
                </div>
                <div className="layout">
                    <NewsLeftbar />
                    <div className="contents NOTICE_LIST" id="contents">
                        <div className="top_tit">
                            <h1 className="tit_1">사찰 소식</h1>
                        </div>
                        <h2 className="tit_2">사찰 일정</h2>
                        <BoardCalendar/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsCalendarList;