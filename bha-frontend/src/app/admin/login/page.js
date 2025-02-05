"use client"

import Link from 'next/link';
import LoginContents from '@/components/LoginContents';
import URL from '@/data/url';
import { useState } from 'react';
import AdminLoginContents from "@/components/AdminLoginContents";

export default function SiteLogin() {
    const [userInfo, setUserInfo] = useState(null);

    const onChangeLogin = (user) => {
        setUserInfo(user);
    }

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        {/*<li><Link href={URL.HOME} className="home" >Home</Link></li>*/}
                        {/*<li>로그인</li>*/}
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    <AdminLoginContents
                        onChangeLogin={onChangeLogin}
                    />
                </div>
            </div>
        </div>
    );
}