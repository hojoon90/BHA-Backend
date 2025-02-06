import Link from "next/link";
import URL from "@/data/url";
import {useRouter} from "next/navigation";

function SubMenus() {
    const router = useRouter();

    return (
        <>
        <h2 className="blind">전체메뉴</h2>
        <div className="inner">
            <div className="col">
                <h3>법장사 소개</h3>
                <ul>
                    <li><Link href={URL.ABOUT_SITE} className={router.pathname === URL.ABOUT_SITE ? "cur" : ""}>소개</Link></li>
                    <li><Link href={URL.ABOUT_GREETING} className={router.pathname === URL.ABOUT_GREETING ? "cur" : ""}>주지스님 인사말</Link></li>
                    <li><Link href={URL.ABOUT_HISTORY} className={router.pathname === URL.ABOUT_HISTORY ? "cur" : ""}>연혁</Link></li>
                    <li><Link href={URL.ABOUT_TREASURE} className={router.pathname === URL.ABOUT_HISTORY ? "cur" : ""}>성보 문화재</Link></li>
                    <li><Link href={URL.ABOUT_LOCATION} className={router.pathname === URL.ABOUT_LOCATION ? "cur" : ""}>오시는 길</Link></li>
                </ul>
            </div>
            <div className="col">
                <h3>법회 및 행사</h3>
                <ul>
                    <li><Link href={URL.CONTENT_MEETING} className={router.pathname === URL.CONTENT_MEETING ? "cur" : ""}>법회안내</Link></li>
                    <li><Link href={URL.CONTENT_PRAY} className={router.pathname === URL.CONTENT_PRAY ? "cur" : ""}>기도안내</Link></li>
                    <li><Link href={URL.CONTENT_EVENT} className={router.pathname === URL.CONTENT_EVENT ? "cur" : ""}>주요 행사안내</Link></li>
                </ul>
            </div>
            <div className="col">
                <h3>사찰 소식</h3>
                <ul>
                    <li><Link href={URL.NEWS_NOTICE} className={router.pathname === URL.NEWS_NOTICE ? "cur" : ""}>공지사항</Link></li>
                    <li><Link href={URL.NEWS_MESSAGE} className={router.pathname === URL.NEWS_MESSAGE ? "cur" : ""}>법장사 뉴스</Link></li>
                    <li><Link href={URL.NEWS_CALENDAR} className={router.pathname === URL.ABOUT_HISTORY ? "cur" : ""}>사찰 일정</Link></li>
                    <li><Link href={URL.NEWS_VIDEO} className={router.pathname === URL.NEWS_VIDEO ? "cur" : ""}>법회 영상</Link></li>
                    <li><Link href={URL.NEWS_YOUNGSAN} className={router.pathname === URL.NEWS_YOUNGSAN ? "cur" : ""}>영산회상</Link></li>
                </ul>
            </div>
            <div className="col">
                <h3>포교 및 신행</h3>
                <ul>
                    <li><Link href={URL.COMMUNITY_SCHOOL} className={router.pathname === URL.COMMUNITY_SCHOOL ? "cur" : ""}>영산불교학교</Link></li>
                    <li><Link href={URL.COMMUNITY_SANGHA} className={router.pathname === URL.COMMUNITY_SANGHA ? "cur" : ""}>신행단체</Link></li>
                    <li><Link href={URL.COMMUNITY_KINDERGARTEN} className={router.pathname === URL.COMMUNITY_KINDERGARTEN ? "cur" : ""}>위탁어린이집</Link></li>
                </ul>
            </div>
            {/*TODO*/}
            {/*<div className="col">*/}
            {/*    <h3>참여마당</h3>*/}
            {/*    <ul>*/}
            {/*        <li><Link href={URL.FORUM_FREE} className={router.pathname === URL.FORUM_FREE ? "cur" : ""}>자유게시판</Link></li>*/}
            {/*        <li><Link href={URL.FORUM_GALLERY} className={router.pathname === URL.FORUM_GALLERY ? "cur" : ""}>갤러리</Link></li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </div>
        </>
    );
}

export default SubMenus;


