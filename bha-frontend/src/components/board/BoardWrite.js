import { useState, useEffect, useCallback } from "react";
import TextEditor from "@/components/TextEditor";
import FileAttach from "@/components/FileAttach";
import * as ExtApi from "@/lib/api";
import { getSessionItem } from "@/lib/storage"
import {modifyPost} from "@/lib/api";

function BoardWrite({ postId, listUrl, mode, posblAtchFileNumber, boardType }) {
    const [currentBoardDetail, setBoardDetail] = useState({
        title: '',
        contents: '', // Initialize contents to an empty string
        boardFiles: []
    });
    const [isEditing, setIsEditing] = useState(mode === "EDIT");
    const [editorValue, setEditorValue] = useState('');

    // `useCallback`을 사용해 상태 업데이트 최적화
    const handleEditorChange = useCallback((value) => {
        setEditorValue(value);
        setBoardDetail(prevDetail => ({
            ...prevDetail,
            contents: value
        }));
    }, []); // 의존성 배열을 빈 배열로 설정하여 최초 한 번만 리렌더링


    // 수정 모드일 경우 기존 데이터를 로딩
    useEffect(() => {
        if (mode === "EDIT" && postId) {
            ExtApi.fetchPostById(boardType, postId)
                .then((response) => {
                    setBoardDetail(response.data); // API 응답 데이터를 상태에 저장
                    setEditorValue(response.data.contents||'');
                })
                .catch((error) => {
                    console.error('게시물 조회 실패:', error);
                });
        }
    }, [mode, postId]);

    const updateBoard = async (token) => {
        console.log("Token: "+token);
        try {
            const formData = new FormData();

            if (mode === "EDIT") {
                // 수정 처리 로직
                console.log("게시판 수정: ", currentBoardDetail);
                // 수정 또는 새 글 작성에 대한 API 호출 로직
                const jsonPayload = JSON.stringify({
                    postId: postId,
                    title: currentBoardDetail.title,
                    contents: editorValue,
                    boardType: boardType,
                });
                formData.append("data", new Blob([jsonPayload], { type: "application/json" }));

                // 파일이 있으면 추가
                if (currentBoardDetail.boardFiles && currentBoardDetail.boardFiles.length > 0) {
                    currentBoardDetail.boardFiles.forEach((file) => {
                        formData.append("file", []); // key는 @RequestPart("file")와 일치해야 함
                    });
                }
                await ExtApi.modifyPost(formData, token);
            } else {
                // 새 글 작성 처리 로직
                console.log("새 게시판 글 작성: ", currentBoardDetail);

                const jsonPayload = JSON.stringify({
                    title: currentBoardDetail.title,
                    contents: editorValue,
                    boardType: boardType,
                });
                formData.append("data", new Blob([jsonPayload], { type: "application/json" }));

                // 파일이 있으면 추가
                if (currentBoardDetail.boardFiles && currentBoardDetail.boardFiles.length > 0) {
                    currentBoardDetail.boardFiles.forEach((file) => {
                        formData.append("file", file); // key는 @RequestPart("file")와 일치해야 함
                    });
                }

                // JSON 데이터를 Blob으로 변환하여 추가
                await ExtApi.createPost(formData, token);
            }

            // 성공 시 목록 페이지로 이동
            window.location.href = listUrl;  // 또는 router.push 사용
        } catch (err) {
            console.error("게시판 저장 오류: ", err);
        }
    };

    return (
        <div className="contents NOTICE_LIST" id="contents">
            <div className="board_view2">
                <h2 className="tit_2">{isEditing ? "글 수정" : "글 작성"}</h2>
                <dl>
                    <dd>
                        <input
                            className="f_input2 w_full"
                            id="title"
                            name="title"
                            type="text"
                            placeholder="제목을 입력해주세요(최대 60자)"
                            value={currentBoardDetail.title || ""}
                            onChange={(e) => setBoardDetail({ ...currentBoardDetail, title: e.target.value })}
                            maxLength="60"
                        />
                    </dd>
                </dl>
                <dl>
                    <dd>
                        <TextEditor
                            value={editorValue}
                            onChange={handleEditorChange}
                        />
                    </dd>
                </dl>
                <dl>
                    <dd>
                        <p>최대 {posblAtchFileNumber}개의 파일을 업로드할 수 있습니다.</p>
                        <p>첨부파일은 10mb 이상 등록할 수 없습니다.</p>
                        <FileAttach
                            fnChangeFile={(files) => {
                                console.log("Changed files:", files);
                                const updatedFiles = [...(currentBoardDetail.boardFiles || []), ...files];
                                setBoardDetail({ ...currentBoardDetail, boardFiles: updatedFiles });
                            }}
                            fnDeleteFile={(deletedFiles) => {
                                console.log("Deleted files:", deletedFiles);
                                setBoardDetail({ ...currentBoardDetail, boardFiles: deletedFiles });
                            }}
                            boardFiles={currentBoardDetail.boardFiles || []}
                            mode={mode}
                            posblAtchFileNumber={posblAtchFileNumber}
                        />
                    </dd>
                </dl>
                {/* 버튼영역 */}
                <div className="board_btn_area">
                    <div className="left_col btn1">
                        <a
                            href="#!"
                            className="btn btn_skyblue_h46 w_100"
                            onClick={(e) => {
                                e.preventDefault();
                                updateBoard(getSessionItem('accessToken'));
                            }}
                        >
                            {isEditing ? "수정" : "저장"}
                        </a>
                    </div>
                    <div className="right_col btn1">
                        <a href={listUrl} className="btn btn_blue_h46 w_100">
                            목록
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoardWrite;