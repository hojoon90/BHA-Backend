'use client'; // 클라이언트 사이드에서만 동작하도록 하기 위해 'use client' 선언

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/lib/api'; // API 모듈 임포트

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = { title, content };

        try {
            await createPost(postData); // API 호출
            router.push('/posts'); // 게시글 작성 후 목록 페이지로 이동
        } catch (error) {
            setError('게시글 작성에 실패했습니다.');
        }
    };

    return (
        <div>
            <h1>새 게시글 작성</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">내용</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">게시글 작성</button>
            </form>
        </div>
    );
}