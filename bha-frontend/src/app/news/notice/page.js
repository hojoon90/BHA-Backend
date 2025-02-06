"use client"

import URL from '@/data/url';
import NewsDefaultPage from "@/components/board/page/NewsDefaultPage"; // 추가한 페이징 컴포넌트

function NoticePage(props) {
    const bbsId = "NEWS_NOTICE";
    const pageName = "공지사항";

    return (
        <NewsDefaultPage
            bbsId={bbsId}
            pageName={pageName}
            pageUrl={URL.NEWS_NOTICE}
        />
    );
}

export default NoticePage;