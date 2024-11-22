'use client';  // 클라이언트 컴포넌트로 설정

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import URL from '@/data/url';

// 아이콘 맵핑
const ContentLeftbar = () => {
    const router = useRouter();

    // 현재 경로와 링크의 경로를 비교하여 활성화 상태를 확인하는 함수
    const isActive = (href) => {
        return router.pathname === href;
    };

    return (
        <div className="nav">
            <div className="inner">
                <h2>법회 및 행사</h2>
                <ul className="menu4">
                    <li><Link href={URL.CONTENT_MEETING} className={isActive(URL.CONTENT_MEETING) ? "cur" : ""}>법회안내</Link></li>
                    <li><Link href={URL.CONTENT_PRAY} className={isActive(URL.CONTENT_PRAY) ? "cur" : ""}>기도안내</Link></li>
                    <li><Link href={URL.CONTENT_EVENT} className={isActive(URL.CONTENT_EVENT) ? "cur" : ""}>주요 행사안내</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default ContentLeftbar;