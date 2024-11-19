'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const toggleSubDropdown = () => {
        setIsSubDropdownOpen((prev) => !prev);
    };

    return (
        <nav>
            <ul className={styles.menu}>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                    <ul className={styles.dropdown}>
                        <li>
                            <Link href="/about/team">Our Team</Link>
                        </li>
                        <li>
                            <Link href="/about/history">History</Link>
                        </li>
                        <li>
                            <Link href="/about/culture">Culture</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <button className={styles.button} onClick={toggleDropdown}>Services</button>
                    {isDropdownOpen && (
                        <ul className={styles.dropdown}>
                            <li>
                                <Link href="/services/web-development">Web Development</Link>
                            </li>
                            <li>
                                <Link href="/services/seo">SEO</Link>
                            </li>
                            <li>
                                <button className={styles.button} onClick={toggleSubDropdown}>More Services</button>
                                {isSubDropdownOpen && (
                                    <ul className={styles.subDropdown}>
                                        <li>
                                            <Link href="/services/marketing">Marketing</Link>
                                        </li>
                                        <li>
                                            <Link href="/services/design">Design</Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    )}
                </li>
                <li>
                    <Link href="/contact">Contact</Link>
                </li>
                <li>
                    <Link href="/post">Post</Link> {/* 포스트 링크 추가 */}
                </li>
            </ul>
        </nav>
    );
}