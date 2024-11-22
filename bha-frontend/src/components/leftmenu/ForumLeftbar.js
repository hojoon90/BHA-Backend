'use client';  // 클라이언트 컴포넌트로 설정

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import URL from '@/data/url';

// 아이콘 맵핑
const ForumLeftbar = () => {
    const router = useRouter();
    const isActive = (href) => {
        return router.pathname === href;
    };

    return (
        <div className="nav">
            <div className="inner">
                <h2>참여마당</h2>
                <ul className="menu4">
                    <li><Link href={URL.FORUM_FREE} className={isActive(URL.FORUM_FREE) ? "cur" : ""}>자유개시판</Link></li>
                    <li><Link href={URL.FORUM_GALLERY} className={isActive(URL.FORUM_GALLERY) ? "cur" : ""}>갤러리</Link></li>
                    <li><Link href={URL.FORUM_YOUNGSAN} className={isActive(URL.FORUM_YOUNGSAN) ? "cur" : ""}>영산회상</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default ForumLeftbar;