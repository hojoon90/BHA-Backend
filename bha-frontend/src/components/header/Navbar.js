import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from "react";
import URL from '@/data/url';
import {AuthContext} from "@/components/AuthProvider";

function Navbar() {
    const router = useRouter();

    const { user, updateUser } = useContext(AuthContext);

    return (
        <div className="gnb">
            <h2 className="blind">주메뉴</h2>
            <ul>
                <li><Link href={URL.ABOUT_SITE} className={router.pathname === URL.ABOUT_SITE ? "cur" : ""}>법장사 소개</Link></li>
                <li><Link href={URL.CONTENT_MEETING} className={router.pathname === URL.CONTENT_MEETING ? "cur" : ""}>법회 및 행사</Link></li>
                <li><Link href={URL.NEWS_NOTICE} className={router.pathname === URL.NEWS_NOTICE ? "cur" : ""}>사찰 소식</Link></li>
                <li><Link href={URL.COMMUNITY_SCHOOL} className={router.pathname === URL.COMMUNITY_SCHOOL ? "cur" : ""}>포교 및 신행</Link></li>
                {/*<li><Link href={URL.FORUM_FREE} className={router.pathname === URL.FORUM_FREE ? "cur" : ""}>참여마당</Link></li>*/}
                {user?.authority === 'ADMIN' && (
                    <li><Link href={URL.ADMIN_CALENDAR} className={router.pathname === URL.ADMIN_LOGIN ? "cur" : ""}>사이트관리</Link></li>
                )}
            </ul>
        </div>
    );
};

export default Navbar;