'use client';  // 클라이언트 컴포넌트로 설정

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import URL from '@/data/url';

// 아이콘 맵핑
const AboutLeftbar = () => {
    const router = useRouter();

    // 현재 경로와 링크의 경로를 비교하여 활성화 상태를 확인하는 함수
    const isActive = (href) => {
        return router.pathname === href;
    };

    return (
        <div className="nav">
            <div className="inner">
                <h2>법장사 소개</h2>
                <ul className="menu4">
                    <li><Link href={URL.ABOUT_SITE} className={isActive(URL.ABOUT_SITE) ? "cur" : ""}>소개</Link></li>
                    <li><Link href={URL.ABOUT_GREETING} className={isActive(URL.ABOUT_GREETING) ? "cur" : ""}>주지스님 인사말</Link></li>
                    <li><Link href={URL.ABOUT_HISTORY} className={isActive(URL.ABOUT_HISTORY) ? "cur" : ""}>연혁</Link></li>
                    {/*<li><Link href={URL.ABOUT_ORGANIZATION} className={isActive(URL.ABOUT_ORGANIZATION) ? "cur" : ""}>조직소개</Link></li>*/}
                    <li><Link href={URL.ABOUT_TREASURE} className={isActive(URL.ABOUT_TREASURE) ? "cur" : ""}>성보 문화재</Link></li>
                    <li><Link href={URL.ABOUT_LOCATION} className={isActive(URL.ABOUT_LOCATION) ? "cur" : ""}>오시는 길</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default AboutLeftbar;