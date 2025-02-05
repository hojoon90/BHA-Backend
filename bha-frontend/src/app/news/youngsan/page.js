"use client"

import {useState, useEffect, useCallback, useContext} from 'react';
import Link from 'next/link';
import * as ExtApi from '@/lib/api';
import URL from '@/data/url';
import BoardList from "@/components/board/BoardList";
import NewsLeftbar from "@/components/leftmenu/NewsLeftbar";
import {useRouter} from "next/navigation";
import {AuthContext} from "@/components/AuthProvider";


function YoungsanPage(props) {
    const bbsId = "NEWS_YOUNGSAN";
    const router = useRouter();
    const { user, updateUser } = useContext(AuthContext);

    // 기본 검색 조건
    const [searchCondition, setSearchCondition] = useState({
        boardType: bbsId,
        offset: 1,
        limit: 10,
        searchWrd: ''
    });

    const [paginationInfo, setPaginationInfo] = useState({});
    const [listTag, setListTag] = useState([]);

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
                        <Link href={{pathname: `${URL.NEWS_YOUNGSAN}/${item.postId}`}}
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

    const handleCreatePost = () => {
        // 로그인 상태면 게시글 작성 페이지로 이동
        router.push(`${URL.NEWS_NOTICE}/create`);
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
                        <li><Link href={URL.NEWS_NOTICE}>사찰 소식</Link></li>
                        <li>영산회상</li>
                    </ul>
                </div>

                <div className="layout">
                    {/* Navigation */}
                    <NewsLeftbar />

                    <div className="contents SITE_GALLARY_LIST" id="contents">
                        <div className="top_tit">
                            <h1 className="tit_1">사찰 소식</h1>
                        </div>

                        <h2 className="tit_2">영산회상</h2>

                        {/* 게시판목록 */}
                        <BoardList
                            listTag={listTag}
                            paginationInfo={paginationInfo}
                            moveToPage={moveToPage}
                        />

                        {user?.authority === 'ADMIN' ? (
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
                        ):(
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YoungsanPage;