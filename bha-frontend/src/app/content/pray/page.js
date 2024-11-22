import Link from 'next/link';
import URL from '@/data/url';
import ContentLeftbar from '@/components/leftmenu/ContentLeftbar';

export default function PrayPage() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link href={URL.HOME}>Home</Link></li>
                        <li><Link href={URL.CONTENT_MEETING}>법회 및 행사</Link></li>
                        <li>기도안내</li>
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
                        <h2 className="tit_4">기도안내</h2>

                        <h3 className="tit_5">초하루 법화신중기도</h3>
                        <p className="msg_1">
                            매월 음력 초하루에 진행합니다. <br/>각종 신통력을 갖추고 있으면서 부처님으로부터 교화를 받아 불법과 불자들을 온갖 장애와
                            마구니로부터 보호할 것을 서원 세운 영산회상의 법화신중님들께 한 달을 시작하면서 온갖 평안와 가호와 가피를 기도드리고 법회를 봉행합니다.
                        </p>

                        <h3 className="tit_5">보름 인명 광등기도</h3>
                        <p className="msg_1">
                            매월 음력 15일에 진행합니다. <br/>가정과 마음속의 온갖 어둠과 불행을 몰아내기 위해 부처님전에 인등(등불) 공양을 올리고 부처님의
                            지혜와 자비광명의 가피를 입는 기도입니다.
                        </p>

                        <h3 className="tit_5">지장재일 업장소멸기도</h3>
                        <p className="msg_1">
                            매월 음력 18일에 진행합니다. <br/>한없는 생과 일상생활을 통하여 지은 죄업을 기도와 108대참회로 소멸하고,
                            아울러 조상님과 모든 유주무주(有主無主) 애혼고혼(哀魂孤魂)까지 극락왕생 시켜드리는 기도입니다.
                        </p>

                        <h3 className="tit_5">관음재일 행복발원기도</h3>
                        <p className="msg_1">
                            매월 음력 24일에 진행합니다. <br/>온갖 중생을 자비로써 구제하시어 고통과 괴로움을 소멸시켜주시는 관세음보살님께
                            가정의 건강과 행복을 발원하는 기도입니다.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}