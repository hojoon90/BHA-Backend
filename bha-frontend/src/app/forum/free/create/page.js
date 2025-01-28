"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import URL from '@/data/url';
import CODE from '@/data/code';
import { getSessionItem } from '@/lib/storage'; // 세션에서 로그인 사용자 정보 가져오기
import BoardDetail from '@/components/board/BoardDetail';
import Link from "next/link";
import ForumLeftbar from "@/components/leftmenu/ForumLeftbar";
import * as ExtApi from "@/lib/api";
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'

//https://velog.io/@khy226/Next.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-React-Quill%ED%85%8D%EC%8A%A4%ED%8A%B8-%EC%97%90%EB%94%94%ED%84%B0-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
const QuillWrapper = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

export default function FreeBoardEdit({ initialBoardDetail, mode }) {
    const router = useRouter();
    const boardType = "FREE_BOARD"; // 게시판 타입 설정
    // const { bbsId } = router.query; // URL에서 동적 파라미터 추출
    const checkRef = useRef([]);

    // // 라디오 버튼 및 셀렉트 옵션
    // const replyPosblAtRadioGroup = [
    //     { value: "Y", label: "가능" },
    //     { value: "N", label: "불가능" },
    // ];
    // const fileAtchPosblAtRadioGroup = [
    //     { value: "Y", label: "가능" },
    //     { value: "N", label: "불가능" },
    // ];
    // const bbsTyCodeOptions = [
    //     { value: "", label: "선택" },
    //     { value: "BBST01", label: "일반게시판" },
    //     { value: "BBST03", label: "공지게시판" },
    // ];
    // const bbsAttrbCodeOptions = [
    //     { value: "", label: "선택" },
    //     { value: "BBSA02", label: "갤러리" },
    //     { value: "BBSA03", label: "일반게시판" },
    // ];
    // const posblAtchFileNumberOptions = [
    //     { value: 0, label: "선택하세요" },
    //     { value: 1, label: "1개" },
    //     { value: 2, label: "2개" },
    //     { value: 3, label: "3개" },
    // ];

    // 상태 관리
    const [boardDetail, setBoardDetail] = useState(initialBoardDetail || {});

    // 데이터 가져오기
    // const retrieveDetail = async () => {
    //     if (mode === CODE.MODE_CREATE) {
    //         setBoardDetail({
    //             tmplatId: "TMPLAT_BOARD_DEFAULT", // Template 고정
    //             replyPosblAt: "Y", // 답장 가능 여부 초기값
    //             fileAtchPosblAt: "Y", // 파일 첨부 여부 초기값
    //         });
    //         return;
    //     }
    //
    //     try {
    //         const resp = await ExtApi.fetchPostById(boardType, );
    //         if (resp?.result?.boardMasterVO) {
    //             setBoardDetail(resp.result.boardMasterVO);
    //         }
    //     } catch (err) {
    //         console.error("Error fetching board details:", err);
    //     }
    // };
    //
    // // 유효성 검사
    // const formValidator = (formData) => {
    //     if (!formData.get("bbsNm")) {
    //         alert("게시판명은 필수 값입니다.");
    //         return false;
    //     }
    //     if (!formData.get("bbsIntrcn")) {
    //         alert("게시판 소개는 필수 값입니다.");
    //         return false;
    //     }
    //     if (!formData.get("bbsTyCode")) {
    //         alert("게시판 유형은 필수 값입니다.");
    //         return false;
    //     }
    //     if (!formData.get("bbsAttrbCode")) {
    //         alert("게시판 속성은 필수 값입니다.");
    //         return false;
    //     }
    //     return true;
    // };

    // 게시판 저장
    const updateBoard = async () => {
        try {
            const resp = await ExtApi.createPost(JSON.stringify(boardDetail));
            if (resp?.resultCode === CODE.RCV_SUCCESS) {
                router.push(URL.FORUM_FREE);
            } else {
                alert(resp.resultMessage || "오류가 발생했습니다.");
            }
        } catch (err) {
            console.error("Error saving board:", err);
        }
    };

    return (
        <div className="container">
            <div className="c_wrap">
                {/* Location */}
                <div className="location">
                    <ul>
                        <li><Link href={URL.HOME} className="home">Home</Link></li>
                        <li><Link href={URL.NEWS_NOTICE}>참여마당</Link></li>
                        <li>자유게시판</li>
                    </ul>
                </div>
                <div className="layout">
                    {/* 페이지 구조 */}
                    <ForumLeftbar/>
                    <div className="contents NOTICE_LIST" id="contents">
                        <div className="board_view2">

                            {/*TODO 게시판 타입. 이미지는 에디터에서 추가할수 있도록. 첨부파일은 필요. 게시판 타입으로 쓸 시 공통 처리 가능*/}

                            <dl>

                                <dd>
                                    <input className="f_input2 w_full" id="nttSj" name="nttSj" type="text"
                                           placeholder={"제목을 입력해주세요"}
                                           defaultValue={boardDetail.nttSj}
                                           onChange={e => setBoardDetail({...boardDetail, nttSj: e.target.value})}
                                           maxLength="60"/>
                                </dd>
                            </dl>
                            <dl>
                                {/*<dt><label htmlFor="nttCn">내용 <span className="req">필수</span></label></dt>*/}
                                <dd>
                                    <QuillWrapper  theme="snow" />
                                    {/*<textarea className="f_txtar w_full h_200" id="nttCn" name="nttCn" cols="30"*/}
                                    {/*          rows="10" placeholder=""*/}
                                    {/*          defaultValue={boardDetail.nttCn}*/}
                                    {/*          onChange={e => setBoardDetail({*/}
                                    {/*              ...boardDetail,*/}
                                    {/*              nttCn: e.target.value*/}
                                    {/*          })}></textarea>*/}
                                </dd>
                            </dl>
                            {/* 답글이 아니고 게시판 파일 첨부 가능 상태에서만 첨부파일 컴포넌트 노출 */}
                            {/*<FileAttach*/}
                            {/*    fnChangeFile={(attachfile) => {*/}
                            {/*        console.log("====>>> Changed attachfile file = ", attachfile);*/}
                            {/*        const arrayConcat = {...boardDetail}; // 기존 단일 파일 업로드에서 다중파일 객체 추가로 변환(아래 for문으로)*/}
                            {/*        for (let i = 0; i < attachfile.length; i++) {*/}
                            {/*            arrayConcat[`file_${i}`] = attachfile[i];*/}
                            {/*        }*/}
                            {/*        setBoardDetail(arrayConcat);*/}
                            {/*    }}*/}
                            {/*    fnDeleteFile={(deletedFile) => {*/}
                            {/*        console.log("====>>> Delete deletedFile = ", deletedFile);*/}
                            {/*        setBoardAttachFiles(deletedFile);*/}
                            {/*    }}*/}
                            {/*    boardFiles={boardAttachFiles}*/}
                            {/*    mode={props.mode}*/}
                            {/*    posblAtchFileNumber={masterBoard.posblAtchFileNumber}*/}
                            {/*/>*/}
                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <a href="#!" className="btn btn_skyblue_h46 w_100"
                                       onClick={(e) => {
                                           updateBoard();
                                       }}>저장</a>
                                </div>

                                <div className="right_col btn1">
                                    <a href={URL.FORUM_FREE} className="btn btn_blue_h46 w_100">목록</a>
                                </div>
                            </div>
                        {/* <!--// 버튼영역 --> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// // 서버사이드 데이터 로딩 (SSR)
// export async function getServerSideProps(context) {
//     const { mode, bbsId } = context.query;
//     let initialBoardDetail = {};
//
//     if (mode === CODE.MODE_MODIFY) {
//         const resp = await EgovNet.requestFetch(`/bbsMaster/${bbsId}`);
//         initialBoardDetail = resp?.result?.boardMasterVO || {};
//     }
//
//     return {
//         props: {
//             initialBoardDetail,
//             mode,
//         },
//     };
// }