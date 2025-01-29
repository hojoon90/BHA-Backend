"use client";

import React, { useState } from "react";

export default function FileAttach({
                                       boardFiles = [],
                                       mode,
                                       fnChangeFile,
                                       fnDeleteFile,
                                       posblAtchFileNumber = 5, // 디폴트 최대 파일 수
                                   }) {
    const [fileList, setFileList] = useState(boardFiles);

    const handleFileInputChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + fileList.length > posblAtchFileNumber) {
            alert(`첨부파일은 최대 ${posblAtchFileNumber}개까지 업로드 가능합니다.`);
            return;
        }

        const updatedFileList = [...fileList, ...files];
        setFileList(updatedFileList);
        fnChangeFile(updatedFileList); // 부모 컴포넌트로 파일 리스트 전달
    };

    const handleDeleteFile = (index) => {
        const updatedFileList = fileList.filter((_, i) => i !== index);
        setFileList(updatedFileList);
        fnDeleteFile(updatedFileList); // 부모 컴포넌트로 삭제된 파일 리스트 전달
    };

    return (
        <div className="f_input3_w_full">
            <div className="file_attach">
                <div className="file-list">
                {fileList.map((file, index) => (
                    <div key={index} className="file_item">
                        <span>{file.name || file.orignlFileNm}</span>
                        <button
                            type="button"
                            className="btn_delete"
                            onClick={() => handleDeleteFile(index)}
                        />
                    </div>
                ))}
                {(mode === "CREATE" || mode === "MODIFY") && (
                    <div className="file_input">
                        <input
                            type="file"
                            multiple
                            onChange={handleFileInputChange}
                            className="file_upload"
                        />
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}