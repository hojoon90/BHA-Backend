"use client";

import { AuthProvider } from '@/components/AuthProvider';

export default function ClientWrapper({ children }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}