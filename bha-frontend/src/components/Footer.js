import Link from 'next/link';

function Footer() {
    return (
        <div className="footer">
            <div className="inner">
                <div className="info">
                    <p>
                        대표문의메일 : bupjangsa@hanmail.net <span className="m_hide">|</span><br className="m_show"/> 대표전화
                        : <span>02-971-</span><span>0303</span>
                    </p>
                    <p className="copy">Copyright © 2024 Bupjangsa Temple. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;