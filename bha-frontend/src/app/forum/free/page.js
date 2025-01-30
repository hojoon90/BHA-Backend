"use client"

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import * as ExtApi from '@/lib/api';
import URL from '@/data/url';
import ForumLeftbar from "@/components/leftmenu/ForumLeftbar";
import BoardList from "@/components/board/BoardList"; // 추가한 페이징 컴포넌트
import { getSessionItem } from "@/lib/storage";
import {useRouter} from "next/navigation";

function FreeBoardPage(props) {
    const bbsId = "FREE_BOARD";
    const router = useRouter();

    // 기본 검색 조건
    const [searchCondition, setSearchCondition] = useState({
        boardType: bbsId,
        offset: 1,
        limit: 10,
        searchWrd: ''
    });

    const [paginationInfo, setPaginationInfo] = useState({});
    const [listTag, setListTag] = useState([]);

    // 로그인 상태 확인 함수 (예시)
    const isLoggedIn = () => {
        // 여기서 로그인 상태를 확인하는 로직을 추가합니다.
        // 예: localStorage나 쿠키에서 토큰 확인
        const token = getSessionItem('accessToken'); // 예시
        return !!token; // 토큰이 있으면 true, 없으면 false
    };

    const handleCreatePost = () => {
        if (!isLoggedIn()) {
            // 로그인 상태가 아니면 로그인 페이지로 이동
            const currentPath = window.location.pathname; // 현재 페이지 경로
            router.push(`${URL.LOGIN}?redirect=${currentPath}`); // URL.LOGIN은 로그인 페이지 경로
        } else {
            // 로그인 상태면 게시글 작성 페이지로 이동
            router.push(`${URL.FORUM_FREE}/create`);
        }
    };

    const retrieveList = useCallback((searchCondition) => {

        ExtApi.fetchPosts(searchCondition)
            .then(resp => {
                setPaginationInfo({
                    currentPageNo: searchCondition.offset,
                    pageSize: 10,
                    totalRecordCount: resp.data.count,
                    recordCountPerPage: searchCondition.limit,
                });

                let mutListTag = [];
                mutListTag.push(<p className="no_data" key="0">검색된 결과가 없습니다.</p>);

                resp.data.postDetails.forEach(function (item, index) {
                    if (index === 0) mutListTag = [];

                    const formattedDate = item.createdAt.split('T')[0];

                    mutListTag.push(
                        <Link href={{pathname: `${URL.FORUM_FREE}/${item.postId}`}}
                              key={item.postId}
                              className="list_item"
                        >
                            <div>{item.postId}</div>
                            {item.replyLc * 1 ? (
                                <div className="al reply">{item.title}</div>
                            ) : (
                                <div className="al">{item.title}</div>
                            )}
                            <div>{item.createdBy}</div>
                            <div>{formattedDate}</div>
                            <div>{item.viewCnt}</div>
                        </Link>
                    );
                });
                setListTag(mutListTag);
            }, (resp) => {
            });
    }, []);

    const moveToPage = (pageNumber) => {
        setSearchCondition(prev => ({
            ...prev,
            offset: pageNumber
        }));
    };

    useEffect(() => {
        retrieveList(searchCondition);
    }, [searchCondition]);

    return (
        <div className="container">
            <div className="c_wrap">
                {/* Location */}
                <div className="location">
                    <ul>
                        <li><Link href={URL.HOME} className="home">Home</Link></li>
                        <li><Link href={URL.FORUM_FREE}>참여마당</Link></li>
                        <li>자유게시판</li>
                    </ul>
                </div>

                <div className="layout">
                    {/* Navigation */}
                    <ForumLeftbar/>

                    <div className="contents SITE_GALLARY_LIST" id="contents">
                        <div className="top_tit">
                            <h1 className="tit_1">참여마당</h1>
                        </div>

                        <h2 className="tit_2">자유게시판</h2>

                        {/* 게시판목록 */}
                        <BoardList
                            listTag={listTag}
                            paginationInfo={paginationInfo}
                            moveToPage={moveToPage}
                        />
                        {/* 게시물 등록 버튼 */}
                        <div className="board_btn_area">
                            <div className="left_col btn1">
                            </div>

                            <div className="right_col btn1">
                                <button
                                    className="btn btn_blue_h46 w_100"
                                    onClick={handleCreatePost}
                                >
                                    등록
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FreeBoardPage;