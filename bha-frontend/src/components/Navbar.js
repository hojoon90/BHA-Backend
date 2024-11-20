"use client"; // 클라이언트 전용 컴포넌트

import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li>
                    <Link href="/" className={styles.navItem}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/about" className={styles.navItem}>
                        About
                    </Link>
                </li>
                <li>
                    <Link href="/posts" className={styles.navItem}>
                        Posts
                    </Link>
                </li>
                <li>
                    <Link href="/contact" className={styles.navItem}>
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;