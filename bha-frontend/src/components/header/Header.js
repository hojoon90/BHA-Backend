"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import URL from '@/data/url';

import Navbar from "@/components/header/Navbar";
import UserInfo from "@/components/header/UserInfo";
import SubMenus from "@/components/header/SubMenus";
import MobileMenu from "@/components/header/MobileMenu";

// import CODE from 'constants/code';
function Header() {
    const router = useRouter();

    return (
        <div className="header">
            <div className="inner">
                {/*<Link href={URL.HOME} className="ico lnk_go_template" target="_blank">홈페이지 템플릿 소개 페이지로 이동</Link>*/}

                <h1 className="logo">
                    <Link href={URL.HOME} className="w">
                        <Image src="/assets/images/logo2.svg" width="289" height="40" alt="logo" priority/>
                    </Link>
                    <Link href={URL.HOME} className="m">
                        <Image
                            src="/assets/images/logo2.svg"
                            alt="logo"
                            priority
                            width={404}  // width는 0으로 설정하고 height만 고정
                            height={33} // height는 고정
                            style={{ width: 'auto', height: '30px', alignItems: 'center' }}
                        />
                    </Link>
                </h1>

                <Navbar/>

                {/*<div className="user_info">*/}
                    {/*<UserInfo/>*/}
                {/*</div>*/}

                <div className="right_a">
                    <button type="button" className="btn btnAllMenu" title="전체메뉴 닫힘">전체메뉴</button>
                    <button type="button" className="btn mobile btnAllMenuM" title="전체메뉴 닫힘">전체메뉴</button>
                </div>
            </div>

            {/* 전체메뉴 웹 */}
            <div className="all_menu WEB closed">
                <SubMenus/>
            </div>

            {/*모바일 전체메뉴*/}
            <div className="all_menu Mobile closed">
                <div className="user_info_m">
                    {/*<UserInfo/>*/}
                    <button className="btn noscript close" type="button">전체메뉴 닫기</button>
                </div>
                <div className="menu">
                    <MobileMenu/>
                </div>
            </div>
        </div>
    );
}

export default Header;