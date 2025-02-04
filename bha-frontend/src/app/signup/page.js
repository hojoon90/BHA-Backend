"use client"

import {useState} from "react";
import URL from '@/data/url';
import {useRouter} from "next/navigation";
import {setLocalItem, setSessionItem} from "@/lib/storage";

export default function registerPage() {
    const router = useRouter();

    const [termsChecked, setTermsChecked] = useState(false);
    const [privacyChecked, setPrivacyChecked] = useState(false);

    const isFormValid = termsChecked && privacyChecked;

    const handleTermsCheck = () => {
        setSessionItem("TERMS_CHECK", !termsChecked);
        setTermsChecked(!termsChecked);
    };

    const handlePrivacyCheck = () => {
        setSessionItem("PRIVACY_CHECK", !privacyChecked);
        setPrivacyChecked(!privacyChecked);
    };



    const handleRegistPage = () => {
        if (!isFormValid) {
            alert('약관에 모두 동의하셔야 합니다.');
        } else {
            // 로그인 상태면 게시글 작성 페이지로 이동
            router.push(`${URL.REGISTER}`);
        }
    };

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location"/>
                {/* <!--// Location --> */}

                <div className="layout">

                    <div className="contents REGIST_TERM" id="contents">
                        {/* <!-- 본문 --> */}

                        <h1 className="tit_3">회원 가입</h1>
                        <p className="txt_1"></p>
                        <h2 className="tit_4">이용 약관</h2>
                        <h3 className="tit_5"></h3>

                        <p className="msg_1_scroll">
                            <b>[이용 약관]</b>
                            <br/>
                            <br/>
                            <b>제1조 (목적)</b>
                            <br/>
                            본 약관은 '대한불교조계종 법장사' (이하 "법장사")가 제공하는 서비스의 이용 조건 및 절차, 이용자와 사이트 간의 권리, 의무 및 책임 사항 등을 규정함을
                            목적으로
                            합니다.<br/>
                            <br/>
                            <b>제2조 (정의)</b>
                            <br/>
                            "사이트"란 법장사가 운영하는 웹사이트 및 관련 서비스를 의미합니다.<br/>
                            "이용자"란 본 약관에 따라 사이트가 제공하는 서비스를 이용하는 회원 및 비회원을 의미합니다.<br/>
                            "회원"이란 사이트에 개인정보를 제공하여 회원 등록을 한 자로서, 사이트의 정보를 지속적으로 제공받으며 서비스를 이용할 수 있는 자를 의미합니다.<br/>
                            "비회원"이란 회원가입을 하지 않고 사이트가 제공하는 서비스를 이용하는 자를 의미합니다.<br/>
                            <br/>
                            <b>제3조 (약관의 게시 및 개정)</b>
                            <br/>
                            본 약관은 사이트 초기 화면 또는 연결된 화면에 게시됩니다.<br/>
                            사이트는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있으며, 개정된 약관은 적용일자 최소 7일 전에 공지됩니다.<br/>
                            이용자는 개정된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있으며, 개정 후에도 서비스를 계속 이용하는 경우 약관 개정에 동의한 것으로 간주됩니다.<br/>
                            <br/>
                            <b>제4조 (서비스의 제공 및 변경)</b>
                            <br/>
                            사이트는 다음과 같은 서비스를 제공합니다.<br/>
                            온라인 정보 제공 서비스<br/>
                            기타 사이트가 추가 개발하거나 다른 업체와의 제휴를 통해 제공하는 서비스<br/>
                            사이트는 기술적 필요 또는 운영상의 사유로 서비스 내용을 변경할 수 있으며, 변경 사항은 사전에 공지됩니다.<br/>
                            <br/>
                            <b>제5조 (회원 가입 및 탈퇴)</b>
                            <br/>
                            이용자는 사이트에서 정한 절차에 따라 회원가입을 신청할 수 있으며, 사이트는 이를 승낙할 수 있습니다.<br/>
                            회원은 언제든지 사이트에서 정한 절차에 따라 탈퇴할 수 있으며, 사이트는 즉시 회원 탈퇴를 처리합니다.<br/>
                            <br/>
                            <b>제6조 (개인정보 보호)</b>
                            <br/>
                            사이트는 이용자의 개인정보를 보호하기 위해 관련 법령을 준수하며, 개인정보 처리방침을 운영합니다.<br/>
                            이용자의 개인정보 보호 및 사용에 대한 자세한 내용은 사이트의 개인정보처리방침에서 확인할 수 있습니다.<br/>
                            <br/>
                            <b>제7조 (이용자의 의무)</b>
                            <br/>
                            이용자는 사이트 이용 시 다음 행위를 해서는 안 됩니다.<br/>
                            • 허위 정보를 제공하는 행위<br/>
                            • 타인의 개인정보를 무단으로 수집하거나 악용하는 행위<br/>
                            • 사이트의 운영을 방해하는 행위<br/>
                            • 기타 불법적이거나 부당한 행위<br/>
                            <br/>
                            이용자가 본 조를 위반할 경우 사이트는 서비스 이용을 제한할 수 있습니다.<br/>
                            <br/>
                            <b>제8조 (사이트의 책임 제한)</b>
                            <br/>
                            사이트는 천재지변, 시스템 오류 등 불가항력적인 사유로 인한 서비스 제공의 중단에 대해 책임을 지지 않습니다.<br/>
                            사이트는 이용자가 서비스 이용 과정에서 발생한 손해에 대해 책임을 지지 않습니다.<br/>
                            <br/>
                            <b>제9조 (분쟁 해결 및 관할 법원)</b>
                            <br/>
                            사이트와 이용자 간에 발생한 분쟁은 원만하게 해결하는 것을 원칙으로 합니다.<br/>
                            분쟁이 해결되지 않을 경우, 관련 법령에 따른 절차를 따르며, 관할 법원은 서울 중랑구의 관할 법원으로 합니다.<br/>
                            <br/>
                            부칙<br/>
                            본 약관은 2025년 2월 2일부터 시행됩니다.
                        </p>
                        <div className="chk">
                            <input
                                className="f_chk"
                                type="checkbox"
                                id="terms"
                                checked={termsChecked}
                                onChange={handleTermsCheck}
                            />
                            <label htmlFor="terms">
                                이용 약관에 동의합니다.
                            </label>
                        </div>
                        <h2 className="tit_4_bottom">개인정보 수집 및 이용 동의</h2>
                        <h3 className="tit_5"></h3>
                        <p className="msg_1_scroll">
                            <b>[개인정보 수집 및 이용 동의서]</b>
                            <br/>
                            <br/>
                            <b>1. 개인정보 수집 항목</b><br/>
                            단체는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.<br/>
                            • 필수 항목: 이메일 주소, 아이디, 비밀번호<br/>
                            <br/>
                            <b>2. 개인정보 수집 및 이용 목적</b><br/>
                            단체는 수집한 개인정보를 다음과 같은 목적으로 이용합니다.<br/>
                            • 회원 가입 및 관리<br/>
                            • 서비스 제공 및 이용자 식별<br/>
                            • 고객 상담 및 민원 처리<br/>
                            <br/>
                            <b>3. 개인정보 보유 및 이용 기간</b><br/>
                            단체는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 즉시 파기합니다. 단, 관련 법령에 따라 일정 기간 보관할 필요가 있는 경우, 해당 기간 동안
                            보관합니다.<br/>
                            • 회원 정보: 회원 탈퇴 후 30일 보관 (재가입 방지 목적)<br/>
                            <br/>
                            <b>4. 동의 거부 권리 및 불이익 안내</b><br/>
                            이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 다만, 필수 항목에 대한 동의를 거부할 경우, 서비스 이용이 제한될 수 있습니다.<br/>
                            <br/>
                            본인은 위 내용을 충분히 이해하였으며, 이에 동의합니다.
                        </p>
                        <div className="chk">
                                <input
                                    className="f_chk"
                                    type="checkbox"
                                    id="privacy"
                                    checked={privacyChecked}
                                    onChange={handlePrivacyCheck}
                                />
                            <label htmlFor="privacy">개인정보 수집 및 이용에 동의합니다.</label>
                        </div>
                        <div className="board_bot"/>
                        <div className="board_btn_area">

                            <div className="center_col btn1">
                                <button
                                    className="btn btn_blue_h46 w_100"
                                    onClick={handleRegistPage}
                                >
                                    회원가입
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}