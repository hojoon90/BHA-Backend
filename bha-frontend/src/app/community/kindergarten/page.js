import Link from 'next/link';
import URL from '@/data/url';
import AboutLeftbar from '@/components/leftmenu/AboutLeftbar';
import CommunityLeftBar from "@/components/leftmenu/CommunityLeftBar";

export default function KindergartenPage() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link href={URL.HOME}>Home</Link></li>
                        <li><Link href={URL.ABOUT_SITE}>포교 및 신행</Link></li>
                        <li>위탁어린이집</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <CommunityLeftBar/>
                    {/* <!--// Navigation --> */}

                    <div className="contents KINDERGARTEN_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <h1 className="tit_3">포교 및 신행</h1>
                        <p className="txt_1">포교활동 및 신행 안내입니다.</p>
                        <h2 className="tit_4">위탁어린이집</h2>
                        <h3 className="tit_5"></h3>


                        <div className="mini_board">
                            <ul className="tab">
                                <li><a href="#한내들" className="on">한내들 어린이집</a></li>
                                <li><a href="#딸기">딸기 어린이집</a></li>
                                <li><a href="#동심">동심 어린이집</a></li>
                            </ul>
                            <div className="list">
                                <div className="one msg_1">
                                    한내들 어린이집 소개
                                </div>

                                <div className="two msg_1">
                                    딸기 어린이집 소개
                                </div>

                                <div className="three msg_1">
                                    동심 어린이집 소개
                                </div>
                            </div>
                        </div>


                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}