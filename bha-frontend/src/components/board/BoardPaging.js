import React from 'react';

const BoardPaging = React.memo(({ paginationInfo, moveToPage }) => {
    if (!paginationInfo || Object.keys(paginationInfo).length === 0) {
        return null;
    }

    const { currentPageNo, pageSize, totalRecordCount, recordCountPerPage } = paginationInfo;
    const totalPageCount = Math.ceil(totalRecordCount / recordCountPerPage);
    const currentFirstPage = Math.floor((currentPageNo - 1) / pageSize) * pageSize + 1;
    let currentLastPage = currentFirstPage + pageSize - 1;
    currentLastPage = (currentLastPage > totalPageCount) ? totalPageCount : currentLastPage;

    let paginationTag = [];

    if (totalPageCount > pageSize) {
        // 첫 페이지 이동
        paginationTag.push(
            <li key="fp" className="btn">
                <button onClick={() => moveToPage(1)} className="first">처음</button>
            </li>
        );

        // 이전 페이지 이동
        const prevPageIndex = (currentPageNo - 1 > 0) ? currentPageNo - 1 : 1;
        paginationTag.push(
            <li key="pp" className="btn">
                <button onClick={() => moveToPage(prevPageIndex)} className="prev">이전</button>
            </li>
        );
    }

    // 현재 페이지 목록
    for (let i = currentFirstPage; i <= currentLastPage; i++) {
        if (i === currentPageNo) {
            paginationTag.push(
                <li key={i}>
                    <button className="cur">{i}</button>
                </li>
            );
        } else {
            paginationTag.push(
                <li key={i}>
                    <button onClick={() => moveToPage(i)}>{i}</button>
                </li>
            );
        }
    }

    if (totalPageCount > pageSize) {
        // 다음 페이지 이동
        const nextPageIndex = (currentLastPage + 1 < totalPageCount) ? currentLastPage + 1 : totalPageCount;
        paginationTag.push(
            <li key="np" className="btn">
                <button onClick={() => moveToPage(nextPageIndex)} className="next">다음</button>
            </li>
        );

        // 마지막 페이지 이동
        paginationTag.push(
            <li key="lp" className="btn">
                <button onClick={() => moveToPage(totalPageCount)} className="last">마지막</button>
            </li>
        );
    }

    return (
        <div className="paging">
            <ul>
                {paginationTag}
            </ul>
        </div>
    );
});

export default BoardPaging;