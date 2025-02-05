import Link from 'next/link';
import URL from '@/data/url';
import AboutLeftbar from '@/components/leftmenu/AboutLeftbar';
import CommunityLeftBar from "@/components/leftmenu/CommunityLeftBar";

export default function CollegePage() {
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
                        <h2 className="tit_4">영산불교학교</h2>
                        <h3 className="tit_5">소개</h3>
                        <p className="msg_1">
                            '기도하는 마음, 포교하는 기쁨'을 사찰 개원 이념으로 삼고 있는 법장사는 교양 불교대학 과정인 <b>영산불교학교</b>를 운영하고 있습니다. <b>영산불교학교</b>는
                            맹목적인 믿음이 아니라 부처님의 가르침을 올바르게 배워 참된 불자의 길을 가는데 있어서 탄탄한 밑받침이 되게 하고,
                            이를 통해 삶을 살아가는데 있어서 신앙인으로서 자신감과 안식처를 얻게 됩니다.<br/>
                            <br/>
                            절을 수십년을 다녔다고해서 진정한 불교인이 되는 것은 아닙니다. 다만 '절에 다닌 사람'일 뿐입니다.<br/>
                            불교를 믿는다는 것은 말 그대로 <b>부처님의 가르침을 믿고 실천하는 사람</b>을 말하는 것 입니다.
                            그런데 부처님이 누군지, 가르침의 내용이 무엇인지 모르면서 절에 다녔다고 한다면 올바른 불자의 길을 가고 있는 것은 아니라고 볼 수 있습니다.<br/><br/>
                            법장사 영산불교학교에서는 체계적인 교리와 경전 공부 그리고 각종 생활 및 문화 강좌를 연령, 성별, 학식에 관련 없이 쉽고 재미있게 공부할 수 있습니다.
                        </p>

                        <h3 className="tit_5">교리반</h3>
                        <p className="msg_1">
                            설명설명
                        </p>
                        <br/>
                        <div className="board_view2">
                            <dl>
                                <dt>교육 기간</dt>
                                <dd>약 4개월 ~ 6개월</dd>
                            </dl>
                            <dl>
                                <dt>시간</dt>
                                <dd>매주 목요일 오전 10시 ~ 12시</dd>
                            </dl>
                            <dl>
                                <dt>교육 내용</dt>
                                <dd>불교 예절, 불교 상식, 부처님의 일생, 기쵸 교리, 불교사, 불교 문화, 참선 지도, 기타 생활강좌</dd>
                            </dl>
                            <dl>
                                <dt>교육 장소</dt>
                                <dd>법장사 경전 내</dd>
                            </dl>
                            <dl>
                                <dt>자격 요건</dt>
                                <dd>누구나</dd>
                            </dl>
                            <dl>
                                <dt>금액</dt>
                                <dd>수계비 5만원</dd>
                            </dl>
                        </div>
                        <br/><br/>
                        <h3 className="tit_5">경전반</h3>
                        <p className="msg_1">
                            설명설명설명
                        </p>
                        <br/>
                        <div className="board_view2">
                            <dl>
                                <dt>시간</dt>
                                <dd>매주 수요일 오전 10시 ~ 12시</dd>
                            </dl>
                            <dl>
                                <dt>주요 강좌 경전</dt>
                                <dd>천수경, 예불, 반야심경, 지장경, 금강경, 아함경, 법화경, 화엄경, 유아경 등</dd>
                            </dl>
                            <dl>
                                <dt>교육 장소</dt>
                                <dd>법장사 경전 내</dd>
                            </dl>
                            <dl>
                                <dt>자격 요건</dt>
                                <dd>누구나</dd>
                            </dl>
                            <dl>
                                <dt>금액</dt>
                                <dd>없음</dd>
                            </dl>
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}