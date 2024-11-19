'use client'; // 클라이언트 사이드에서만 동작하도록 하기 위해 'use client' 선언

import { useEffect, useState } from 'react';
import { fetchPosts } from '@/lib/api'; // API 모듈 임포트
import Link from 'next/link';

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getPosts() {
            try {
                const data = await fetchPosts(); // API 호출
                setPosts(data);
            } catch (error) {
                setError('게시글을 불러오는 데 실패했습니다.');
            }
        }

        getPosts();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>게시글 목록</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link href={`/posts/${post.id}`}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}