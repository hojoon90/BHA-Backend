import Link from 'next/link';
import URL from '@/data/url';
import ContentLeftbar from '@/components/leftmenu/ContentLeftbar';

export default function MeetingPage() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link href={URL.HOME}>Home</Link></li>
                        <li><Link href={URL.CONTENT_MEETING}>법회 및 행사</Link></li>
                        <li>법회안내</li>
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
                        <h2 className="tit_4">법회안내</h2>

                        <h3 className="tit_5">일요 가족 합동 법회</h3>
                        <p className="msg_1">
                            매주 일요일 오전 10시 반
                        </p>

                        <h3 className="tit_5">어린이 법회</h3>
                        <p className="msg_1">
                            매주 일요일 오전 10시 반
                        </p>

                        <h3 className="tit_5">대학/쳥년 법회</h3>
                        <p className="msg_1">
                            매주 일요일 오후 2시
                        </p>

                        <h3 className="tit_5">중/고등학생 법회</h3>
                        <p className="msg_1">
                            매주 일요일 오전 10시 반
                        </p>

                        <h3 className="tit_5">거사회 법회</h3>
                        <p className="msg_1">
                            매주 일요일 오전 10시 반
                        </p>

                        <h3 className="tit_5">지역법등 법회</h3>
                        <p className="msg_1">
                            매주 지역별 해당 요일 오후 2시
                        </p>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}