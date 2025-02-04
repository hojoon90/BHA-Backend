'use client';  // 클라이언트 컴포넌트로 설정

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import URL from '@/data/url';

// 아이콘 맵핑
const CommunityLeftBar = () => {
    const router = useRouter();

    // 현재 경로와 링크의 경로를 비교하여 활성화 상태를 확인하는 함수
    const isActive = (href) => {
        return router.pathname === href;
    };

    return (
        <div className="nav">
            <div className="inner">
                <h2>포교 및 신행단체</h2>
                <ul>
                    <li><Link href={URL.COMMUNITY_SCHOOL} className={router.pathname === URL.COMMUNITY_SCHOOL ? "cur" : ""}>영산불교학교</Link></li>
                    <li><Link href={URL.COMMUNITY_SANGHA} className={router.pathname === URL.COMMUNITY_SANGHA ? "cur" : ""}>신행단체 안내</Link></li>
                    <li><Link href={URL.COMMUNITY_KINDERGARTEN} className={router.pathname === URL.COMMUNITY_KINDERGARTEN ? "cur" : ""}>위탁 어린이집</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default CommunityLeftBar;