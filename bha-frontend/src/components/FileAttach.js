import React from 'react';
import { useRouter } from 'next/router';

import URL from '@/data/url'; // 경로 수정
import CODE from "@/data/code"; // 상수 코드
import * as ExtApi from "@/lib/api";

function FileAttach({ boardFiles, mode, fnChangeFile, fnDeleteFile, posblAtchFileNumber }) {
    console.groupCollapsed("EgovAttachFile");

    // 첨부파일 개수 제한 디폴트 값 설정
    if (typeof posblAtchFileNumber === "undefined" || posblAtchFileNumber === null) {
        posblAtchFileNumber = 1;
    }

    const router = useRouter();

    const onClickDownFile = (atchFileId, fileSn) => {
        window.open(`${SERVER_URL}/file?atchFileId=${atchFileId}&fileSn=${fileSn}`);
    };

    const onClickDeleteFile = async (atchFileId, fileSn, fileIndex) => {
        console.log("onClickDeleteFile Params:", atchFileId, fileSn, fileIndex);

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                atchFileId: atchFileId,
                fileSn: fileSn,
            }),
        };

        try {
            const resp = await EgovNet.requestFetch(`/file`, requestOptions);
            console.log("===>>> board file delete= ", resp);
            if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                // 성공
                console.log("Deleted fileIndex =", fileIndex);
                const _deleteFile = boardFiles.splice(fileIndex, 1);
                const _boardFiles = Object.assign([], boardFiles);
                fnDeleteFile(_boardFiles);
                alert("첨부파일이 삭제되었습니다.");
                fnChangeFile({});
            } else {
                router.push({
                    pathname: URL.ERROR,
                    query: { msg: resp.resultMessage },
                });
            }
        } catch (err) {
            console.error("첨부파일 삭제 중 오류 발생:", err);
        }
    };

    const onChangeFileInput = (e) => {
        console.log("===>>> e = " + e.target.files[0]);

        if (e.target.files.length + (boardFiles?.length || 0) > posblAtchFileNumber) {
            alert(`총 첨부파일 개수는 ${posblAtchFileNumber} 까지 입니다.`);
            e.target.value = null; // 파일 입력란 화면 초기화
            fnChangeFile({}); // 상위 컴포넌트의 저장된 값 초기화
            return false;
        }
        fnChangeFile(e.target.files);
    };

    let filesTag = [];

    if (boardFiles !== undefined) {
        boardFiles.forEach((item, index) => {
            filesTag.push(
                <React.Fragment key={index}>
          <span>
            <a
                href="#LINK"
                onClick={(e) => {
                    e.preventDefault();
                    onClickDownFile(item.atchFileId, item.fileSn);
                }}
                download
            >
              {item.orignlFileNm}
            </a>
            <span>[{item.fileMg}byte]</span>
          </span>
                </React.Fragment>
            );

            if (mode === CODE.MODE_MODIFY) {
                filesTag.push(
                    <React.Fragment key={`button-${index}`}>
                        <button
                            className="btn btn_delete"
                            onClick={() => onClickDeleteFile(item.atchFileId, item.fileSn, index)}
                        >
                            삭제
                        </button>
                    </React.Fragment>
                );
            }
            filesTag.push(<br key={`br-${index}`} />);
        });
    }
    console.log("filesTag:", filesTag);
    console.groupEnd("EgovAttachFile");

    return (
        <dl>
            <dt>첨부파일</dt>
            <dd>
        <span className="file_attach">
          {filesTag}
            {mode === CODE.MODE_CREATE && (
                <>
                    <input
                        name="file_0"
                        id="egovComFileUploader"
                        type="file"
                        multiple
                        onChange={onChangeFileInput}
                    />
                    총 업로드 가능한 첨부파일 개수는 {posblAtchFileNumber} 개 입니다.
                </>
            )}
            {/* 첨부파일 1개당 filesTag는 3개 요소(span, button, br)를 가진다 */}
            {mode === CODE.MODE_MODIFY && filesTag.length / 3 < posblAtchFileNumber && (
                <>
                    <input
                        name="file_0"
                        id="egovComFileUploader"
                        type="file"
                        multiple
                        onChange={onChangeFileInput}
                    />
                    현재 업로드 가능한 첨부파일 개수는 {posblAtchFileNumber - filesTag.length / 3} 개 입니다.
                </>
            )}
        </span>
            </dd>
        </dl>
    );
}

export default React.memo(FileAttach);