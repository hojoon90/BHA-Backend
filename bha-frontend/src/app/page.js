"use client"

import { useState, useEffect, useCallback, useContext } from 'react';
import Link from 'next/link';

import * as ExtApi from '@/lib/api';
import URL from '@/data/url';
import {getMainPost} from "@/lib/api";
import BoardCalendar from "@/components/board/BoardCalendar";


function HomePage(props) {

    console.group("EgovMain");
    console.log("[Start] EgovMain ------------------------------");
    console.log("EgovMain [props] : ", props);

    // const location = useLocation();
    // console.log("EgovMain [location] : ", location);

    // eslint-disable-next-line no-unused-vars
    const [noticeBoard, setNoticeBoard] = useState();
    // eslint-disable-next-line no-unused-vars
    const [messageBoard, setMessageBoard] = useState();
    const [noticeListTag, setNoticeListTag] = useState();
    const [messageListTag, setMessageListTag] = useState();

    const retrieveList = useCallback(() => {
        ExtApi.getMainPost()
            .then((resp) => {
                setNoticeBoard(resp.data.noticeDetails);
                setMessageBoard(resp.data.messageDetails);

                let mutNotiListTag = [];
                mutNotiListTag.push(<li key="0">검색된 결과가 없습니다.</li>); // 게시판 목록 초기값
                // 리스트 항목 구성
                resp.data.noticeDetails.forEach(function (item, index) {
                    if (index === 0) mutNotiListTag = []; // 목록 초기화
                    const formattedDate = item.createdAt.split('T')[0];

                    mutNotiListTag.push(
                        <li key={item.postId}>
                            <Link href={{pathname: `${URL.NEWS_NOTICE}/${item.postId}`}}
                                  key={item.postId}
                                  className="list_item"
                            >
                                {item.title}
                                <span>{formattedDate}</span>
                            </Link>
                        </li>
                    );
                });
                setNoticeListTag(mutNotiListTag);

                let mutMessageListTag = [];
                mutMessageListTag.push(<li key="0">검색된 결과가 없습니다.</li>); // 게시판 목록 초기값
                // 리스트 항목 구성
                resp.data.messageDetails.forEach(function (item, index) {
                    if (index === 0) mutMessageListTag = []; // 목록 초기화
                    const formattedDate = item.createdAt.split('T')[0];

                    mutMessageListTag.push(
                        <li key={item.postId}>
                            <Link href={{pathname: `${URL.NEWS_MESSAGE}/${item.postId}`}}
                                  key={item.postId}
                                  className="list_item"
                            >
                                {item.title}
                                <span>{formattedDate}</span>
                            </Link>
                        </li>
                    );
                });
                setMessageListTag(mutMessageListTag);
            })
            .catch((resp) =>{
                console.log("err response : ", resp);
            });
    },[]);

    useEffect(() => {
        retrieveList();
    }, [retrieveList]);

    console.log("------------------------------EgovMain [End]");
    console.groupEnd("EgovMain");

    return (
        <div className="container P_MAIN">
            <div className="main_banner">
                <div className="banner-content">
                    <div className="text-container">
                        <h1>기도하는 마음, 포교하는 기쁨</h1>
                        <p>대한불교 조계종 법장사에 오신 것을 환영합니다.</p>
                    </div>
                </div>
            </div>
            <div className="c_wrap">
                <div className="colbox">
                    <div className="left_col">
                        <img src="/assets/images/s_banner.png"
                             alt=""/>
                    </div>

                    <div className="right_col">
                        <div className="mini_board">
                            <ul className="tab">
                                <li><a href="#공지사항" className="on">공지사항</a></li>
                                <li><a href="#법장사뉴스">법장사 뉴스</a></li>
                            </ul>
                            <div className="list">
                                <div className="notice">
                                    <h2 className="blind">공지사항</h2>
                                    <ul>
                                        {noticeListTag}
                                    </ul>
                                    <Link href={URL.NEWS_NOTICE} className="more">더보기</Link>
                                </div>

                                <div className="gallary">
                                    <h2 className="blind">갤러리</h2>
                                    <ul>
                                        {messageListTag}
                                    </ul>
                                    <Link href={URL.NEWS_MESSAGE} className="more">더보기</Link>
                                </div>
                            </div>
                        </div>

                        <div className="banner">
                            <Link href={URL.ABOUT_TREASURE}>
                                <strong>성보 문화재</strong>
                                <span>법장사가 보유한<br/>문화유산</span>
                            </Link>
                            <Link href={URL.CONTENT_PRAY}>
                                <strong>기도 안내</strong>
                                <span>법장사 기도 안내</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="banner_bot">
                    <div>
                        <div>
                            <h2>영산회상</h2>
                            <p>매월 발행되는 월간지<br/>
                                영산회상을 만나보세요.</p>
                        </div>
                        <Link href={URL.ABOUT_SITE}>자세히 보기</Link>
                    </div>
                    <div className="b2">
                        <div>
                            <h2>주요 행사 안내</h2>
                            <p>법장사에서 진행하는<br/>
                                주요 행사 안내입니다.</p>
                        </div>
                        <Link href={URL.CONTENT_EVENT}>자세히 보기</Link>
                    </div>
                    <div className="b3">
                        <div>
                            <h2>영산불교학교</h2>
                            <p>
                                부처님의 가르침을 배우고<br/>
                                불교를 이해할 수 있습니다.
                            </p>
                        </div>
                        <Link href={URL.COMMUNITY_SCHOOL}>자세히 보기</Link>
                    </div>
                    <div className="b4">
                        <div>
                            <h2>법회영상</h2>
                            <p>매주 일요일 진행되는<br/>
                                정기법회 영상입니다.</p>
                        </div>
                        <Link href={URL.NEWS_VIDEO}>자세히 보기</Link>
                    </div>
                </div>
                <br/>
                <h1>법장사 일정</h1>
                <BoardCalendar/>
                <br/><br/>
            </div>
        </div>

    );
}

export default HomePage;