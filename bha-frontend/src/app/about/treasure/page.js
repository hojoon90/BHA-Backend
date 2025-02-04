import Link from "next/link";
import URL from "@/data/url";
import AboutLeftbar from "@/components/leftmenu/AboutLeftbar";

export default function HistoryPage() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link href={URL.HOME}>Home</Link></li>
                        <li><Link href={URL.ABOUT_SITE}>법장사 소개</Link></li>
                        <li>성보 문화재</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <AboutLeftbar/>
                    {/* <!--// Navigation --> */}

                    <div className="contents TREASURE_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <h1 className="tit_3">법장사 소개</h1>
                        <p className="txt_1">기도하는 마음, 포교하는 기쁨<br/>
                            법장사입니다.</p>
                        <h2 className="tit_4">성보 문화재</h2>
                        <h3 className="tit_5"></h3>


                        <div className="mini_board">
                            <ul className="tab">
                                <li><a href="#1990년대" className="on">1990년대</a></li>
                                <li><a href="#2000년대">2000년대</a></li>
                                <li><a href="#2010년대">2010년대</a></li>
                                <li><a href="#2011년대">2011년대</a></li>
                                <li><a href="#2012년대">2012년대</a></li>
                                <li><a href="#2013년대">2013년대</a></li>
                                <li><a href="#2014년대">2014년대</a></li>
                                <li><a href="#2015년대">2015년대</a></li>
                                <li><a href="#2016년대">2016년대</a></li>
                            </ul>
                            <div className="list">
                                <div className="one msg_2">
                                    1
                                </div>

                                <div className="two msg_2">
                                   2
                                </div>

                                <div className="three msg_2">
                                    3
                                </div>

                                <div className="four msg_2">
                                    4
                                </div>

                                <div className="five msg_2">
                                    5
                                </div>

                                <div className="six msg_2">
                                    6
                                </div>

                                <div className="seven msg_2">
                                    7
                                </div>

                                <div className="eight msg_2">
                                    8
                                </div>

                                <div className="nine msg_2">
                                    9
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