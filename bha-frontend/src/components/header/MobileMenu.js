import Link from "next/link";
import URL from "@/data/url";
import {useRouter} from "next/navigation";

function MobileMenu() {
    const router = useRouter();

    return (
        <>
            <div className="menu">
                <h3><a href="#about">법장사 소개</a></h3>
                <div className="submenu closed">
                    <ul>
                        <li><Link href={URL.ABOUT_SITE} className={router.pathname === URL.ABOUT_SITE ? "cur" : ""}>소개</Link></li>
                        <li><Link href={URL.ABOUT_GREETING} className={router.pathname === URL.ABOUT_GREETING ? "cur" : ""}>주지스님 인사말</Link></li>
                        <li><Link href={URL.ABOUT_HISTORY} className={router.pathname === URL.ABOUT_HISTORY ? "cur" : ""}>연혁</Link></li>
                        <li><Link href={URL.ABOUT_LOCATION} className={router.pathname === URL.ABOUT_LOCATION ? "cur" : ""}>오시는 길</Link></li>
                    </ul>
                </div>
                <h3><a href="#content">법회 및 행사</a></h3>
                <div className="submenu closed">
                    <ul>
                        <li><Link href={URL.CONTENT_MEETING} className={router.pathname === URL.CONTENT_MEETING ? "cur" : ""}>법회안내</Link></li>
                        <li><Link href={URL.CONTENT_PRAY} className={router.pathname === URL.CONTENT_PRAY ? "cur" : ""}>기도안내</Link></li>
                        <li><Link href={URL.CONTENT_MEETING} className={router.pathname === URL.CONTENT_MEETING ? "cur" : ""}>주요 행사안내</Link></li>
                    </ul>
                </div>
                <h3><a href="#news">사찰 소식</a></h3>
                <div className="submenu closed">
                    <ul>
                        <li><Link href={URL.NEWS_NOTICE} className={router.pathname === URL.NEWS_NOTICE ? "cur" : ""}>공지사항</Link></li>
                        <li><Link href={URL.NEWS} className={router.pathname === URL.NEWS ? "cur" : ""}>법장사 뉴스</Link></li>
                        <li><Link href={URL.NEWS_CALENDAR} className={router.pathname === URL.NEWS_CALENDAR ? "cur" : ""}>사찰 일정</Link></li>
                        <li><Link href={URL.NEWS_VIDEO} className={router.pathname === URL.NEWS_VIDEO ? "cur" : ""}>법회 영상</Link></li>
                    </ul>
                </div>
                <h3><a href="#forum">참여마당</a></h3>
                <div className="submenu closed">
                    <ul>
                        <li><Link href={URL.FORUM_FREE} className={router.pathname === URL.FORUM_FREE ? "cur" : ""}>자유개시판</Link></li>
                        <li><Link href={URL.FORUM_GALLERY} className={router.pathname === URL.FORUM_GALLERY ? "cur" : ""}>갤러리</Link></li>
                        <li><Link href={URL.FORUM_YOUNGSAN} className={router.pathname === URL.FORUM_YOUNGSAN ? "cur" : ""}>영산회상</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default MobileMenu;


