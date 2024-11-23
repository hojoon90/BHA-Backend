"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import * as ExtApi from '@/lib/api';
import URL from '@/data/url';
// import {Search} from '@/components/Search';
import NewsLeftbar from "@/components/leftmenu/NewsLeftbar";

function NewsPage(props) {
    const router = useRouter();

    const cndRef = useRef();
    const wrdRef = useRef();

    const bbsId = "NEWS";

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
                // setPaginationInfo(resp.result.paginationInfo);

                let mutListTag = [];
                mutListTag.push(<p className="no_data" key="0">검색된 결과가 없습니다.</p>);

                const resultCnt = parseInt(resp.data.count);
                const currentPageNo = resp.data.totalPages;
                const pageSize = resp.data.pageSize;

                resp.data.postDetails.forEach(function (item, index) {
                    if (index === 0) mutListTag = [];

                    mutListTag.push(
                        <Link href={{
                            pathname: `${URL.NEWS}/${item.postNo}`, // 동적으로 경로를 추가
                            // query: {
                            //     // nttId: item.nttId,
                            //     // bbsId: item.bbsId,
                            //     searchCondition: JSON.stringify(searchCondition) // 상태를 쿼리 파라미터로 전달
                            // }
                        }}
                              key={item.postNo}
                              className="list_item"
                        >
                            <div>{item.postNo}</div>
                            {item.replyLc * 1 ? (
                                <div className="al reply">{item.title}</div>
                            ) : (
                                <div className="al">{item.title}</div>
                            )}
                            <div>{item.createdBy}</div>
                            <div>{item.createdAt}</div>
                            <div>0</div>
                        </Link>
                    );
                });
                setListTag(mutListTag);
            }, (resp) => {
            console.log("err response : ", resp);
        });

        console.groupEnd("EgovGalleryList.retrieveList()");
    }, []);

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
                        <li>법장사 뉴스</li>
                    </ul>
                </div>

                <div className="layout">
                    {/* Navigation */}
                    <NewsLeftbar />

                    <div className="contents SITE_GALLARY_LIST" id="contents">
                        <div className="top_tit">
                            <h1 className="tit_1">사찰 소식</h1>
                        </div>

                        <h2 className="tit_2">법장사 뉴스</h2>

                        {/*<Search />*/}

                        {/* 게시판목록 */}
                        <div className="board_list BRD002">
                            <div className="head">
                                <span>번호</span>
                                <span>제목</span>
                                <span>작성자</span>
                                <span>작성일</span>
                                <span>조회수</span>
                            </div>
                            <div className="result">
                                {listTag}
                            </div>
                        </div>

                        {/*<div className="board_bot">*/}
                        {/*    /!* Paging *!/*/}
                        {/*    <EgovPaging pagination={paginationInfo} moveToPage={passedPage => {*/}
                        {/*        setSearchCondition({*/}
                        {/*            ...searchCondition,*/}
                        {/*            pageIndex: passedPage,*/}
                        {/*            searchCnd: cndRef.current.value,*/}
                        {/*            searchWrd: wrdRef.current.value*/}
                        {/*        });*/}
                        {/*    }} />*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsPage;