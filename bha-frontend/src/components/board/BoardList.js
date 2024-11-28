import React from 'react';
import Link from 'next/link';
import BoardPaging from './BoardPaging'; // 기존 페이징 컴포넌트 가져오기

function BoardList({ listTag, paginationInfo, moveToPage }) {
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