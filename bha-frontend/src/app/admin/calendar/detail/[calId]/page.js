"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

import * as ExtApi from '@/lib/api';
import URL from '@/data/url';
import CODE from '@/data/code';
import AdminLeftBar from "@/components/leftmenu/AdminLeftBar";
import {getCalendarDetail} from "@/lib/api";

function EgovAdminScheduleDetail({ params }) {

    const [scheduleDetail, setScheduleDetail] = useState({});
    const [boardAttachFiles, setBoardAttachFiles] = useState();
    const [user, setUser] = useState({});

    const retrieveDetail = () => {

        const retrieveDetailURL = `/schedule/${location.state?.schdulId}`;

        const requestOptions = {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
            }
        }
        // EgovNet.requestFetch(retrieveDetailURL,
        //     requestOptions,
        //     function (resp) {
        //         let rawScheduleDetail = resp.result.scheduleDetail;
        //         rawScheduleDetail.startDateTime = convertDate(rawScheduleDetail.schdulBgnde);
        //         rawScheduleDetail.endDateTime = convertDate(rawScheduleDetail.schdulEndde);
        //         rawScheduleDetail.reptitSeCodeNm = getCodeName(resp.result.reptitSeCode, resp.result.scheduleDetail.reptitSeCode);
        //         rawScheduleDetail.schdulIpcrCodeNm = getCodeName(resp.result.schdulIpcrCode, resp.result.scheduleDetail.schdulIpcrCode);
        //         rawScheduleDetail.schdulSeNm = getCodeName(resp.result.schdulSe, resp.result.scheduleDetail.schdulSe);
        //         setScheduleDetail(rawScheduleDetail);
        //         setUser(resp.result.user);
        //         setBoardAttachFiles(resp.result.resultFiles);
        //     }
        // );

        ExtApi.getCalendarDetail(params.calId)
            .then((response) => {
                let rawScheduleDetail = response.data;
                rawScheduleDetail.startDate = convertDate(rawScheduleDetail.startDate);
                rawScheduleDetail.endDate = convertDate(rawScheduleDetail.endDate);
                setScheduleDetail(rawScheduleDetail); // API 응답 데이터를 상태에 저장
            })
            .catch((error) => {
                console.error('게시물 조회 실패:', error);
            });


    }
    const convertDate = (str) => {
        str = str.toString();
        let year = str.substring(0, 4);
        let month = str.substring(4, 6);
        let date = str.substring(6, 8);
        return {
            year: year,
            month: month,
            date: date,
            dateForm: year + "년 " + month + "월 " + date + "일 "
        }
    }

    const getCodeName = (codeArr, code) => {
        return (
            codeArr.map((codeObj) => {
                if (codeObj.code === code.trim()) return codeObj.codeNm
                else return "";
            })
        );
    };

    const onClickDeleteSchedule = (calId) => {
        const deleteBoardURL = `/schedule/${calId}`;

        const requestOptions = {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
            }
        }

        // ExtApi.requestFetch(deleteBoardURL,
        //     requestOptions,
        //     (resp) => {
        //         console.log("====>>> Schdule delete= ", resp);
        //         if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
        //             alert("게시글이 삭제되었습니다.")
        //             navigate(URL.ADMIN_SCHEDULE ,{ replace: true });
        //         } else {
        //             // alert("ERR : " + resp.message);
        //             navigate({pathname: URL.ERROR}, {state: {msg : resp.resultMessage}});
        //         }
        //
        //     }
        // );
    }

    useEffect(function () {
        retrieveDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link href={URL.HOME} className="home">Home</Link></li>
                        <li><Link href={URL.ADMIN_CALENDAR}>사이트관리</Link></li>
                        <li>일정관리</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <AdminLeftBar/>
                    {/* <!--// Navigation --> */}

                    <div className="contents SITE_GALLARY_VIEW" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">사이트관리</h1>
                        </div>

                        <h2 className="tit_2">일정관리 상세보기</h2>

                        {/* <!-- 게시판 상세보기 --> */}
                        <div className="board_view2">
                            <dl>
                                <dt>일정구분</dt>
                                <dd>{scheduleDetail.schdulSeNm}</dd>
                            </dl>
                            <dl>
                                <dt>일정명</dt>
                                <dd>{scheduleDetail.eventName}</dd>
                            </dl>
                            <dl>
                                <dt>반복구분</dt>
                                <dd>{scheduleDetail.reptitSeCodeNm}</dd>
                            </dl>
                            <dl>
                                <dt>날짜/시간</dt>
                                <dd> {scheduleDetail.startDate?.dateForm} ~ {scheduleDetail.endDate?.dateForm}</dd>
                            </dl>


                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                
                                <div className="left_col btn1">
                                    <Link href={URL.ADMIN_CALENDAR_CREATE}
                                          // state={{
                                          //     schdulId: location.state?.schdulId
                                          // }}
                                          className="btn btn_skyblue_h46 w_100">수정</Link>
                                    <button className="btn btn_skyblue_h46 w_100"
                                            onClick={(e) => {
                                                onClickDeleteSchedule(location.state?.calId);
                                            }}>삭제</button>

                                </div>

                                <div className="right_col btn1">
                                    <Link href={URL.ADMIN_CALENDAR} className="btn btn_blue_h46 w_100">목록</Link>
                                </div>
                            </div>
                            {/* <!--// 버튼영역 --> */}
                        </div>
                        {/* <!-- 게시판 상세보기 --> */}

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovAdminScheduleDetail;