"use client";

import { createContext, useState, useEffect } from 'react';

// 유저 정보를 저장할 컨텍스트 생성
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // 클라이언트 사이드에서 세션 정보를 불러옴
    useEffect(() => {
        const storedUser = sessionStorage.getItem('loginUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}