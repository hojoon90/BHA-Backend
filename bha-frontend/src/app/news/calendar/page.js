"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import * as ExtApi from "@/lib/api";
import URL from "@/data/url";
import CODE from "@/data/code";
import NewsLeftbar from "@/components/leftmenu/NewsLeftbar";
import { getSessionItem } from "@/lib/storage";

function NewsCalendarList() {
    const TODAY = new Date();

    // State
    const [searchCondition, setSearchCondition] = useState({
        schdulSe: "",
        year: TODAY.getFullYear(),
        month: TODAY.getMonth() + 1, // 1월이 0부터 시작하므로 +1
    });

    const [calendarTag, setCalendarTag] = useState([]);
    const [scheduleList, setScheduleList] = useState([]);
    const [sessionUniqId, setSessionUniqId] = useState(null);

    // 유저 세션 확인 및 상태 업데이트
    useEffect(() => {
        const sessionUser = getSessionItem("loginUser");
        setSessionUniqId(sessionUser?.accountId || null);
    }, []);

    const isAdmin = sessionUniqId === "admin";

    // Helper Functions
    const getLastDateOfMonth = (year, month) => new Date(year, month, 0);
    const getFirstDateOfMonth = (year, month) => new Date(year, month - 1, 1);

    const changeDate = (target, amount) => {
        const newDate =
            target === CODE.DATE_YEAR
                ? new Date(searchCondition.year + amount, searchCondition.month - 1)
                : new Date(searchCondition.year, searchCondition.month - 1 + amount);

        setSearchCondition({
            year: newDate.getFullYear(),
            month: newDate.getMonth() + 1, // 월은 0부터 시작하므로 +1
        });
    };

    // API 데이터 가져오기
    const retrieveList = useCallback(async () => {
        try {
            const response = await ExtApi.getCalendar(searchCondition);
            setScheduleList(response.data.calendarList || []);
        } catch (error) {
            console.error("Error fetching calendar data:", error);
        }
    }, [searchCondition]);

    // 캘린더 렌더링
    const drawCalendar = useCallback(() => {
        const lastOfLastMonth = getLastDateOfMonth(searchCondition.year, searchCondition.month - 1);
        const firstOfThisMonth = getFirstDateOfMonth(searchCondition.year, searchCondition.month);
        const lastOfThisMonth = getLastDateOfMonth(searchCondition.year, searchCondition.month);

        const firstDayOfThisMonth = firstOfThisMonth.getDay();
        const lastDateOfThisMonth = lastOfThisMonth.getDate();

        const weeks = [];
        let currentWeek = [];
        let dayCount = 0;

        // 첫 주
        for (let i = 0; i < 7; i++) {
            if (i < firstDayOfThisMonth) {
                currentWeek.push(null);
            } else {
                currentWeek.push(++dayCount);
            }
        }
        weeks.push(currentWeek);

        // 중간 주와 마지막 주
        while (dayCount < lastDateOfThisMonth) {
            currentWeek = [];
            for (let i = 0; i < 7; i++) {
                if (dayCount < lastDateOfThisMonth) {
                    currentWeek.push(++dayCount);
                } else {
                    currentWeek.push(null);
                }
            }
            weeks.push(currentWeek);
        }

        // 캘린더 UI 생성
        const calendarTags = weeks.map((week, weekIdx) => (
            <tr key={weekIdx}>
                {week.map((day, dayIdx) => {
                    if (!day) return <td key={dayIdx}></td>;

                    const formattedDate = `${searchCondition.year}${String(searchCondition.month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
                    const daySchedules = scheduleList.filter((schedule) => {
                        const startDate = Number(schedule.startDate);
                        const endDate = Number(schedule.endDate);
                        return formattedDate >= startDate && formattedDate <= endDate;
                    });

                    return (
                        <td key={dayIdx}>
                            {isAdmin ? (
                                <Link
                                    href={{
                                        pathname: URL.ADMIN_CALENDAR_CREATE,
                                        query: {iUseDate: formattedDate},
                                    }}
                                    className="day"
                                >
                                    {day}
                                </Link>
                            ) : (
                                <span className="day">{day}</span>
                            )}

                            {daySchedules.map((schedule) =>
                                isAdmin ? (
                                    <Link
                                        href={{
                                            pathname: URL.NEWS_CALENDAR_DETAIL,
                                            query: {calId: schedule.calId},
                                        }}
                                        key={schedule.calId}
                                    >
                                        <br/><br/>
                                        {schedule.eventName}
                                    </Link>
                                ) : (
                                    <span key={schedule.calId}><br/><br/>{schedule.eventName}</span>
                                )
                            )}

                        </td>
                    );
                })}
            </tr>
        ));

        setCalendarTag(calendarTags);
    }, [searchCondition, scheduleList, isAdmin]);

    // Effects
    useEffect(() => {
        retrieveList();
    }, [retrieveList]);

    useEffect(() => {
        drawCalendar();
    }, [scheduleList, drawCalendar]);

    return (
        <div className="container">
            <div className="c_wrap">
                <div className="location">
                    <ul>
                        <li>
                            <Link href={URL.HOME} className="home">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href={URL.NEWS_NOTICE}>사찰 소식</Link>
                        </li>
                        <li>사찰 일정</li>
                    </ul>
                </div>
                <div className="layout">
                    <NewsLeftbar />
                    <div className="contents NOTICE_LIST" id="contents">
                        <div className="top_tit">
                            <h1 className="tit_1">사찰 소식</h1>
                        </div>
                        <h2 className="tit_2">사찰 일정</h2>
                        <div className="condition">
                            <ul>
                                <li className="half L">
                                    <button
                                        className="prev"
                                        onClick={() => changeDate(CODE.DATE_YEAR, -1)}
                                    ></button>
                                    <span>{searchCondition.year}</span>
                                    <button
                                        className="next"
                                        onClick={() => changeDate(CODE.DATE_YEAR, 1)}
                                    ></button>
                                </li>
                                <li className="half R">
                                    <button
                                        className="prev"
                                        onClick={() => changeDate(CODE.DATE_MONTH, -1)}
                                    ></button>
                                    <span>{searchCondition.month}</span>
                                    <button
                                        className="next"
                                        onClick={() => changeDate(CODE.DATE_MONTH, 1)}
                                    ></button>
                                </li>
                            </ul>
                        </div>
                        <div className="calendar_list">
                            <table>
                                <thead>
                                <tr>
                                    <th>일</th>
                                    <th>월</th>
                                    <th>화</th>
                                    <th>수</th>
                                    <th>목</th>
                                    <th>금</th>
                                    <th>토</th>
                                </tr>
                                </thead>
                                <tbody>{calendarTag}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsCalendarList;