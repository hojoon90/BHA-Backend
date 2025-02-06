import React, {useCallback, useEffect, useState} from 'react';
import BoardPaging from './BoardPaging';
import * as ExtApi from "@/lib/api";
import Link from "next/link";

function BoardList({listUrl, bbsId}) {

    const [listTag, setListTag] = useState([]);
    // 기본 검색 조건
    const [searchCondition, setSearchCondition] = useState({
        boardType: bbsId,
        offset: 1,
        limit: 10,
        searchWrd: ''
    });
    const [paginationInfo, setPaginationInfo] = useState({});

    //리스트 조회
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
                        <Link href={{pathname: `${listUrl}/${item.postId}`}}
                              key={item.postId}
                              className="list_item"
                        >
                            <div>{item.postId}</div>
                            {/*{item.replyLc * 1 ? (*/}
                            {/*    <div className="al reply">{item.title}</div>*/}
                            {/*) : (*/}
                            <div className="al">{item.title}</div>
                            {/*)}*/}
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

    //페이지 이동
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

            <div className="board_bot">
                {/* 페이징 컴포넌트 */}
                <BoardPaging
                    paginationInfo={paginationInfo}
                    moveToPage={moveToPage}
                />
            </div>
        </div>
    );
}

export default BoardList;