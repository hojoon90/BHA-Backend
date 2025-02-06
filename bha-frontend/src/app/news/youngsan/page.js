"use client"

import URL from '@/data/url';
import NewsDefaultPage from "@/components/board/page/NewsDefaultPage";


function YoungsanPage(props) {
    const bbsId = "NEWS_YOUNGSAN";
    const pageName = "영산회상";

    return (
       <NewsDefaultPage
           bbsId={bbsId}
           pageName={pageName}
           pageUrl={URL.NEWS_YOUNGSAN}
       />
    );
}

export default YoungsanPage;