import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import InitPage from '@/lib/ui';
import {AuthProvider} from "@/components/AuthProvider";

import '@/styles/base.css';
import '@/styles/component.css';
import '@/styles/page.css';
import '@/styles/layout.css';
import '@/styles/response.css';


export const metadata = {
    title: "대한불교조계종 법장사",
    description: "기도하는 마음, 포교하는 기쁨.",
    icons: {
        icon: "/favicon.png"
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description}/>
            <link rel="icon" href={metadata.icons.icon} sizes="144x144"/>
        </head>
        <body>
        <div>
            <AuthProvider>
                <Header />
                    <main>
                        {children}
                    </main>
                <Footer />
                <InitPage />
            </AuthProvider>
        </div>
        </body>
        </html>
    );
}