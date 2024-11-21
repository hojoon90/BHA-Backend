import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InitPage from'@/lib/ui';
import ClientWrapper from "@/components/ClientWrapper";

import '@/styles/base.css';
import '@/styles/component.css';
import '@/styles/page.css';
import '@/styles/layout.css';
import '@/styles/response.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            {/* 메타 태그 및 링크를 추가할 수 있습니다. */}
            <title>My Website</title>
        </head>
        <body>
        <div>
            <ClientWrapper>
                <Header />
                    <main>
                        {children}
                    </main>
                <Footer />
                <InitPage />
            </ClientWrapper>
        </div>
        </body>
        </html>
    );
}