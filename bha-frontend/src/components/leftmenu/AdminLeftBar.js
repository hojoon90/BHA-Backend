'use client';  // 클라이언트 컴포넌트로 설정

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import URL from '@/data/url';

// 아이콘 맵핑
const AdminLeftBar = () => {
    const router = useRouter();

    // 현재 경로와 링크의 경로를 비교하여 활성화 상태를 확인하는 함수
    const isActive = (href) => {
        return router.pathname === href;
    };

    return (
        <div className="nav">
            <div className="inner">
                <h2>사이트관리</h2>
                <ul>
                    <li><Link href={URL.ADMIN_CALENDAR} className={router.pathname === URL.ADMIN_CALENDAR ? "cur" : ""}>일정 관리</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default AdminLeftBar;