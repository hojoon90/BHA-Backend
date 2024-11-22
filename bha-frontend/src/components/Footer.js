import Link from 'next/link';

function Footer() {
    return (
        <div className="footer">
            <div className="inner">
                <h1>
                    <Link href="">
                        {/*<img className="w" src="/assets/images/logo_footer_w.png" alt="" />*/}
                        {/*<img className="m" src="/assets/images/logo_footer_m.png" alt="" />*/}
                    </Link>
                </h1>
                <div className="info">
                    <p>
                        대표문의메일 : bupjangsa@hanmail.net  <span className="m_hide">|</span><br className="m_show" />  대표전화 : 02-971-0303
                    </p>
                    <p className="copy">Copyright © 2024 Bupjangsa Temple. All Rights Reserved.</p>
                </div>
                <div className="right_col">
                    <Link href="">
                        {/*<img className="w" src="/assets/images/banner_w_01.png" alt="" />*/}
                        {/*<img className="m" src="/assets/images/banner_m_01.png" alt="" />*/}
                    </Link>
                    <Link href="">
                        {/*<img className="w" src="/assets/images/banner_w_02.png" alt="" />*/}
                        {/*<img className="m" src="/assets/images/banner_m_02.png" alt="" />*/}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;