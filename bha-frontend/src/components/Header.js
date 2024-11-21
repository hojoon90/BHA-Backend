"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import * as EgovNet from '@/lib/api';
import URL from '@/data/url';
// import CODE from 'constants/code';
import {getSessionItem, removeSessionItem, setSessionItem} from '@/lib/storage';
import { useEffect, useContext } from 'react';
import { AuthContext } from '@/components/AuthProvider';



function Header() {

    console.log('header');
    const { user } = useContext(AuthContext);

    const sessionUserId = user?.accountId;
    const sessionUserName = user?.name;
    const sessionUserSe = user?.authority;

    const router = useRouter();

    //로그인
    const logInHandler = () => { // 로그인 정보 없을 시
        router.push(URL.LOGIN);
        // PC와 Mobile 열린메뉴 닫기
        document.querySelector('.all_menu.WEB').classList.add('closed');
        document.querySelector('.btnAllMenu').classList.remove('active');
        document.querySelector('.btnAllMenu').title = '전체메뉴 닫힘';
        document.querySelector('.all_menu.Mobile').classList.add('closed');
    }

    //로그아웃
    const logOutHandler = () => { // 로그인 정보 존재할 때
        console.log("===>>> logout");
        removeSessionItem('loginUser');
        removeSessionItem('accessToken');
        window.alert("로그아웃되었습니다!");
        router.push(URL.HOME);
        // PC와 Mobile 열린메뉴 닫기
        document.querySelector('.all_menu.WEB').classList.add('closed');
        document.querySelector('.btnAllMenu').classList.remove('active');
        document.querySelector('.btnAllMenu').title = '전체메뉴 닫힘';
        document.querySelector('.all_menu.Mobile').classList.add('closed');

    }

    // // 상태 변화 감지 및 리렌더링 확인
    // useEffect(() => {
    //     console.log('User state changed:', user);
    // }, [user]);


    return (
        <div className="header">
            <div className="inner">
                {/*<Link href={URL.HOME} className="ico lnk_go_template" target="_blank">홈페이지 템플릿 소개 페이지로 이동</Link>*/}

                <h1 className="logo">
                    <Link href={URL.HOME} className="w">
                        <Image src="/assets/images/logo2.svg" width="289" height="40" alt="logo"/>
                    </Link>
                    <Link href={URL.HOME} className="m">
                        <Image src="/assets/images/logo2.svg" width="404" height="50" alt="logo"/>
                    </Link>
                </h1>

                <div className="gnb">
                    <h2 className="blind">주메뉴</h2>
                    <ul>
                        <li><Link href={URL.ABOUT} className={router.pathname === URL.ABOUT ? "cur" : ""}>법장사 소개</Link></li>
                        <li><Link href={URL.NEWS} className={router.pathname === URL.NEWS ? "cur" : ""}>사찰 소식</Link></li>
                        {/*<li><Link href={URL.SUPPORT} className={router.pathname === URL.SUPPORT ? "cur" : ""}>고객지원</Link></li>*/}
                        {/*<li><Link href={URL.INFORM} className={router.pathname === URL.INFORM ? "cur" : ""}>알림마당</Link></li>*/}
                        {/*{sessionUserSe === 'ADMIN' && (*/}
                        {/*    <li><Link href={URL.ADMIN} className={router.pathname === URL.ADMIN ? "cur" : ""}>사이트관리</Link></li>*/}
                        {/*)}*/}
                    </ul>
                </div>

                <div className="user_info">
                    {/* 로그아웃 : 로그인 정보 있을때 */}
                    {sessionUserId && (
                        <>
                            <span className="person">{sessionUserName} </span> 님이, {sessionUserSe}로 로그인하셨습니다.
                            {sessionUserSe === 'MEMBER' && (
                                <Link href={URL.HOME} className={router.pathname === URL.MYPAGE_MODIFY ? "btn login cur" : "btn login"}>
                                    마이페이지
                                </Link>
                            )}
                            <button onClick={logOutHandler} className="btn">로그아웃</button>
                        </>
                    )}
                    {/* 로그인 : 로그인 정보 없을 때 */}
                    {!sessionUserId && (
                        <>
                            <button onClick={logInHandler} className="btn login">로그인</button>
                            <Link href={URL.HOME} className={router.pathname === URL.HOME ? "btn login cur" : "btn login"}>
                                회원가입
                            </Link>
                        </>
                    )}
                </div>

                <div className="right_a">
                    <button type="button" className="btn btnAllMenu" title="전체메뉴 닫힘">전체메뉴</button>
                    <button type="button" className="btn mobile btnAllMenuM" title="전체메뉴 닫힘">전체메뉴</button>
                </div>
            </div>

            {/* 전체메뉴 웹 */}
            <div className="all_menu WEB closed">
                <h2 className="blind">전체메뉴</h2>
                <div className="inner">
                    <div className="col">
                        <h3>사이트소개</h3>
                        <ul>
                            <li><Link href={URL.ABOUT} className={router.pathname === URL.ABOUT ? "cur" : ""}>소개</Link></li>
                            <li><Link href={URL.ABOUT_GREETING} className={router.pathname === URL.ABOUT_GREETING ? "cur" : ""}>주지스님 인사말</Link></li>
                            <li><Link href={URL.ABOUT_HISTORY} className={router.pathname === URL.ABOUT_HISTORY ? "cur" : ""}>연혁</Link></li>
                            <li><Link href={URL.ABOUT_LOCATION} className={router.pathname === URL.ABOUT_LOCATION ? "cur" : ""}>오시는 길</Link></li>
                        </ul>
                    </div>
                    {/* 여기에 나머지 메뉴들도 동일한 방식으로 추가 */}
                </div>
            </div>

            모바일 전체메뉴
            <div className="all_menu Mobile closed">
                <div className="user_info_m">
                    {sessionUserId && (
                        <>
                            <span className="person">{sessionUserName} </span> 님이, {sessionUserSe}로 로그인하셨습니다.
                            <button onClick={logOutHandler} className="btn logout">로그아웃</button>
                        </>
                    )}
                    {!sessionUserId && (
                        <>
                            <button onClick={logInHandler} className="btn login">로그인</button>
                            <Link href={URL.HOME} className={router.pathname === URL.MYPAGE_CREATE ? "btn login cur" : "btn login"}>
                                회원가입
                            </Link>
                        </>
                    )}
                    <button className="btn noscript close" type="button">전체메뉴 닫기</button>
                </div>
                <div className="menu">
                    {/* 모바일 메뉴도 동일한 방식으로 변환 */}
                </div>
            </div>
        </div>
    );
}

export default Header;