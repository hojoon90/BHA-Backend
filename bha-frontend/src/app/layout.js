import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/global.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            {/* 메타 태그 및 링크를 추가할 수 있습니다. */}
            <title>My Website</title>
        </head>
        <body>
            <Header />
            <main>{children}</main>
            <Footer />
        </body>
        </html>
    );
}