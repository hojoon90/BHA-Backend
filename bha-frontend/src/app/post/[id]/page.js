'use client'; // 클라이언트 사이드에서만 동작하도록 하기 위해 'use client' 선언

import { useEffect, useState } from 'react';
import { fetchPostById } from '@/lib/api'; // API 모듈 임포트

export default function Post({ params }) {
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getPost() {
            try {
                const data = await fetchPostById(params.id); // API 호출
                setPost(data);
            } catch (error) {
                setError('게시글을 불러오는 데 실패했습니다.');
            }
        }

        getPost();
    }, [params.id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
}