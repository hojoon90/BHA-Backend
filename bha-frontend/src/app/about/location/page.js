import Link from "next/link";
import URL from "@/data/url";
import AboutLeftbar from "@/components/leftmenu/AboutLeftbar";

export default function LocationPage() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link href={URL.HOME}>Home</Link></li>
                        <li><Link href={URL.ABOUT_SITE}>법장사 소개</Link></li>
                        <li>오시는 길</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <AboutLeftbar/>
                    {/* <!--// Navigation --> */}

                    <div className="contents SITE_CONTACT_US" id="contents">
                        {/* <!-- 본문 --> */}

                        <h1 className="tit_3">법장사 소개</h1>
                        <p className="txt_1">기도하는 마음, 포교하는 기쁨<br/>
                            법장사입니다.</p>
                        <h2 className="tit_4">오시는 길</h2>
                        <h3 className="tit_5"></h3>
                        <div className="map">
                            <a href="https://naver.me/GGhdJyv9" target="_blank" rel="noreferrer">
                                <img src="/assets/images/maps.png" alt=""/>
                            </a>
                        </div>

                        <div className="addr">
                            <div className="left_col">
                                <h3>대한불교조계종 법장사 주소</h3>
                                <dl>
                                    <dt>도로명주소</dt>
                                    <dd>02030 서울특별시 중랑구 숙선옹주로 69 무진법장사</dd>
                                </dl>
                                <dl>
                                    <dt>지번주소</dt>
                                    <dd>02030 서울특별시 중랑구 묵동 25-4 무진법장사</dd>
                                </dl>
                            </div>
                            {/*<div className="right_col">*/}
                            {/*    <h3>QR코드로 위치알아보기</h3>*/}
                            {/*    <p>스마트폰에서 QR코드<br/>*/}
                            {/*        리더를 이용해 사진·<br/>*/}
                            {/*        지도 등 다양한 정보를<br/>*/}
                            {/*        확인하세요.</p>*/}
                            {/*    <img className="qr" src="/assets/images/qrcode.png" alt="qr code"/>*/}
                            {/*</div>*/}
                        </div>

                        <div className="way">
                            <div className="left_col">
                                <h3>찾아오시는 길</h3>
                                <dl>
                                    <dt>지하철 7호선</dt>
                                    <dd>태릉입구역 7번 출구 도보 15분거리</dd>
                                </dl>
                                <dl>
                                    <dt>지하철 6호선</dt>
                                    <dd>화랑대역 7번 출구 도보 10분거리</dd>
                                </dl>
                                <dl>
                                    <dt>지하철 6호선</dt>
                                    <dd>봉화산역 5번 출구 도보 15분거리</dd>
                                </dl>
                            </div>
                            <div className="right_col">
                                <h3>연락처</h3>
                                <dl>
                                    <dt className="call">전화</dt>
                                    <dd>02-971-0303</dd>
                                </dl>
                                <dl>
                                    <dt className="email">이메일</dt>
                                    <dd>bupjangsa@hanmail.net</dd>
                                </dl>
                            </div>
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}