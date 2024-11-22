import Link from 'next/link';
import URL from '@/data/url';
import ContentLeftbar from '@/components/leftmenu/ContentLeftbar';

export default function EventPage() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link href={URL.HOME}>Home</Link></li>
                        <li><Link href={URL.CONTENT_MEETING}>법회 및 행사</Link></li>
                        <li>주요 행사안내</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <ContentLeftbar></ContentLeftbar>
                    {/* <!--// Navigation --> */}

                    <div className="contents SITE_INTRO" id="contents">
                        {/* <!-- 본문 --> */}

                        <h1 className="tit_3">법회 및 행사</h1>
                        <p className="txt_1">법장사의 법회 및 행사 안내입니다.</p>
                        <h2 className="tit_4">주요 행사안내</h2>

                        <h3 className="tit_5">입춘 삼재· 정초 재수 칠일기도</h3>
                        <p className="msg_1">
                        </p>

                        <h3 className="tit_5">정월대보름 및 동안거 백일기도 회향</h3>
                        <p className="msg_1">
                        </p>

                        <h3 className="tit_5">부처님 오신 날 봉축법요식</h3>
                        <p className="msg_1">
                        </p>

                        <h3 className="tit_5">우란분재 백중 49일기도</h3>
                        <p className="msg_1">
                        </p>

                        <h3 className="tit_5">추석합동차례</h3>
                        <p className="msg_1">
                        </p>

                        <h3 className="tit_5">소원성취 발원 동안거 백일기도 입재</h3>
                        <p className="msg_1">
                        </p>

                        <h3 className="tit_5">액난 소멸 동지 특별 불공</h3>
                        <p className="msg_1">
                        </p>

                        <h3 className="tit_5">가족송년법회</h3>
                        <p className="msg_1">
                        </p>

                    </div>
                </div>
            </div>
        </div>
);
}