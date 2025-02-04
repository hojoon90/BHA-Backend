'use client';  // 클라이언트 컴포넌트로 설정

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import URL from '@/data/url';

// 아이콘 맵핑
const NewsLeftbar = () => {
    const router = useRouter();

    // 현재 경로와 링크의 경로를 비교하여 활성화 상태를 확인하는 함수
    const isActive = (href) => {
        return router.pathname === href;
    };

    return (
        <div className="nav">
            <div className="inner">
                <h2>사찰 소식</h2>
                <ul className="menu4">
                    <li><Link href={URL.NEWS_NOTICE} className={isActive(URL.NEWS_NOTICE) ? "cur" : ""}>공지사항</Link></li>
                    <li><Link href={URL.NEWS} className={isActive(URL.NEWS) ? "cur" : ""}>법장사 뉴스</Link></li>
                    <li><Link href={URL.NEWS_CALENDAR} className={isActive(URL.ABOUT_HISTORY) ? "cur" : ""}>사찰 일정</Link></li>
                    <li><Link href={URL.NEWS_VIDEO} className={isActive(URL.NEWS_VIDEO) ? "cur" : ""}>법회 영상</Link></li>
                    <li><Link href={URL.NEWS_YOUNGSAN} className={isActive(URL.NEWS_YOUNGSAN) ? "cur" : ""}>영산회상</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default NewsLeftbar;