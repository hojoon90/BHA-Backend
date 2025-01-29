"use client"
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css';
import * as ExtApi from '@/lib/api';
import {uploadImage} from "@/lib/api";

//https://velog.io/@khy226/Next.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-React-Quill%ED%85%8D%EC%8A%A4%ED%8A%B8-%EC%97%90%EB%94%94%ED%84%B0-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
const QuillWrapper = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

// 이미지 업로드 처리 함수
const handleImageUpload = async (file, quill) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const data = await ExtApi.uploadImage(formData);
        const imageUrl = data.url; // 서버에서 반환하는 이미지 URL

        // 에디터에 이미지 삽입
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', imageUrl);
    } catch (error) {
        console.error("이미지 업로드 에러:", error);
    }
};

const modules = {
    toolbar: {
        container: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        handlers: {
            image: function () {
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.click();

                input.onchange = () => {
                    const file = input.files[0];
                    if (file) {
                        handleImageUpload(file, this.quill);
                    }
                };
            },
        },
    },
    clipboard: {
        matchVisual: false,
    },
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'indent',
    'link',
    'image',
    'video',
]

export default function TextEditor({ value, onChange, ...props }) {

    // 값이 변경되었을 때 부모로 전달
    const handleEditorChange = (content, delta, source, editor) => {
        if (onChange) {
            onChange(content); // 부모 컴포넌트로 전달
        }
    };


    return (
        <QuillWrapper
            theme="snow"
            style={{ height: "500px", paddingBottom: "50px", borderRadius: "5px !important"}}
            value={value}
            onChange={handleEditorChange}
            modules={modules}
            formats={formats}
            {...props}
        />
    );
}