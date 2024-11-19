const API_URL = 'https://your-backend-api.com/api';

// 게시글 목록 가져오기
export async function fetchPosts() {
    try {
        const res = await fetch(`${API_URL}/posts`);
        if (!res.ok) {
            throw new Error('Failed to fetch posts');
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

// 게시글 상세 정보 가져오기
export async function fetchPostById(id) {
    try {
        const res = await fetch(`${API_URL}/posts/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch post');
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}

// 새 게시글 작성
export async function createPost(postData) {
    try {
        const res = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        if (!res.ok) {
            throw new Error('Failed to create post');
        }
        return await res.json();
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}