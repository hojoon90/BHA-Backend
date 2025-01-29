const API_URL = 'http://localhost:8080/api/v1';

export function getQueryString(params){
    return `?${Object.entries(params).map(e => e.join('=')).join('&') }`
}

// 게시글 목록 가져오기
export async function fetchPosts(params) {
    try {
        const response = await fetch(`${API_URL}/post/list${getQueryString(params)}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

// 게시글 상세 정보 가져오기
export async function fetchPostById(boardType, id) {
    try {
        const res = await fetch(`${API_URL}/post/${boardType}/${id}`);
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
        const res = await fetch(`${API_URL}/post`, {
            method: 'POST',
            body: postData
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

// 게시물 삭제
export async function deletePost(postData) {
    try {
        const res = await fetch(`${API_URL}/post`, {
            method: 'DELETE',
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

export async function loginUser(postData){
    try{
        const res = await fetch(`${API_URL}/user/login`, {
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

export async function getUserInfo(token){
    try{
        const res = await fetch(`${API_URL}/user`, {
            method: 'GET',
            Authorization: 'Bearer ' + token,
            headers: {
                'Content-Type': 'application/json',
            }
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

export async function getCalendar(params){
    try{
        const res = await fetch(`${API_URL}/calendar/eventList`+getQueryString(params), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
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

export async function uploadFile(params){

}

export async function uploadImage(formData){
    try{
        const res = await fetch(`${API_URL}/file/image/upload`, {
            method: "POST",
            body: formData,
        });
        if (!res.ok) throw new Error("이미지 업로드 실패");

        return await res.json();
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}