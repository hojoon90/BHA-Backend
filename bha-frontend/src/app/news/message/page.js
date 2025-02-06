"use client"

import URL from '@/data/url';
import NewsDefaultPage from "@/components/board/page/NewsDefaultPage"; // 추가한 페이징 컴포넌트

function NewsMessagePage(props) {
    const bbsId = "NEWS_MESSAGE";
    const pageName = "법장사 뉴스";

    return (
        <NewsDefaultPage
            bbsId={bbsId}
            pageName={pageName}
            pageUrl={URL.NEWS_MESSAGE}
        />
    );
}

export default NewsMessagePage;