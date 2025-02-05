import Link from 'next/link';
import URL from '@/data/url'

function Footer() {
    return (
        <div className="footer">
            <div className="inner">
                <div className="info">
                    <br/>
                    <p>
                        대표문의메일 : bupjangsa@hanmail.net <span className="m_hide">|</span><br className="m_show"/> 대표전화
                        : <span>02-971-</span><span>0303</span>
                    </p>
                    <p className="copy">Copyright © 2024 Bupjangsa Temple. All Rights Reserved.</p>
                </div>
                <div className="right_col">

                    <br/>
                    <a href={URL.ADMIN_LOGIN}> <span className="w">관리자 로그인</span></a>
                </div>
            </div>
        </div>
    );
}

export default Footer;