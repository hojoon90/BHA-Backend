import Link from 'next/link';
import URL from '@/data/url';
import AboutLeftbar from '@/components/leftmenu/AboutLeftbar';
import CommunityLeftBar from "@/components/leftmenu/CommunityLeftBar";

export default function SanghaPage() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link href={URL.HOME}>Home</Link></li>
                        <li><Link href={URL.ABOUT_SITE}>포교 및 신행</Link></li>
                        <li>영산불교학교</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <CommunityLeftBar/>
                    {/* <!--// Navigation --> */}

                    <div className="contents SITE_INTRO" id="contents">
                        {/* <!-- 본문 --> */}

                        <h1 className="tit_3">포교 및 신행</h1>
                        <p className="txt_1">포교활동 및 신행 안내입니다.</p>
                        <h2 className="tit_4">신행단체 안내</h2>
                        <h3 className="tit_5">소개</h3>
                        <p className="msg_1">

                        </p>

                        <h3 className="tit_5">신도회</h3>
                        <p className="msg_1">

                        </p>
                        <h3 className="tit_5">거사회</h3>
                        <p className="msg_1">

                        </p>
                        <h3 className="tit_5">지장회</h3>
                        <p className="msg_1">

                        </p>
                        <h3 className="tit_5">동창회</h3>
                        <p className="msg_1">

                        </p>
                        <h3 className="tit_5">합창단</h3>
                        <p className="msg_1">

                        </p>
                        <h3 className="tit_5">어린이회</h3>
                        <p className="msg_1">

                        </p>
                        <h3 className="tit_5">중고등학생회</h3>
                        <p className="msg_1">

                        </p>
                        <h3 className="tit_5">대학,청년회</h3>
                        <p className="msg_1">

                        </p>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}