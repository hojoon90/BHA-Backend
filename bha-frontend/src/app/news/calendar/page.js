"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import * as ExtApi from "@/lib/api";
import URL from "@/data/url";
import CODE from "@/data/code";
import NewsLeftbar from "@/components/leftmenu/NewsLeftbar";

function NewsCalendarList() {
    const TODAY = new Date();

    const [searchCondition, setSearchCondition] = useState({
        schdulSe: "",
        year: TODAY.getFullYear(),
        month: TODAY.getMonth(),
        date: TODAY.getDate(),
    });

    const [calendarTag, setCalendarTag] = useState([]);
    const [scheduleList, setScheduleList] = useState([]);

    // 날짜 관련 함수
    const getLastDateOfMonth = (year, month) => new Date(year, month + 1, 0);
    const getFirstDateOfMonth = (year, month) => new Date(year, month, 1);

    const changeDate = (target, amount) => {
        const newDate =
            target === CODE.DATE_YEAR
                ? new Date(searchCondition.year + amount, searchCondition.month, searchCondition.date)
                : new Date(searchCondition.year, searchCondition.month + amount, searchCondition.date);

        setSearchCondition((prev) => ({
            ...prev,
            year: newDate.getFullYear(),
            month: newDate.getMonth(),
            date: newDate.getDate(),
        }));
    };

    // 일정 리스트 가져오기
    const retrieveList = useCallback(async () => {
        try {
            const response = await ExtApi.getCalendar();
            setScheduleList(response.result.resultList);
        } catch (error) {
            console.error("Error fetching calendar data:", error);
        }
    }, []);

    // 캘린더 그리기
    const drawCalendar = useCallback(() => {
        const PREV_MONTH_ADDITION = -1;
        const lastOfLastMonth = getLastDateOfMonth(searchCondition.year, searchCondition.month + PREV_MONTH_ADDITION);
        const firstOfThisMonth = getFirstDateOfMonth(searchCondition.year, searchCondition.month);
        const lastOfThisMonth = getLastDateOfMonth(searchCondition.year, searchCondition.month);

        const firstDayOfThisMonth = firstOfThisMonth.getDay();
        const lastDateOfThisMonth = lastOfThisMonth.getDate();

        const monthArr = [];
        let weekArr = [];
        let dayCount = 0;

        // 첫 주
        for (let day = 0; day < 7; day++) {
            if (day < firstDayOfThisMonth) {
                weekArr.push(0);
            } else {
                weekArr.push(++dayCount);
            }
        }
        monthArr.push(weekArr);

        // 중간 주
        weekArr = [];
        for (let day = dayCount + 1; day <= lastDateOfThisMonth; day++) {
            weekArr.push(day);
            if (weekArr.length === 7) {
                monthArr.push(weekArr);
                weekArr = [];
            }
        }

        // 마지막 주
        if (weekArr.length > 0) {
            while (weekArr.length < 7) {
                weekArr.push(0);
            }
            monthArr.push(weekArr);
        }

        // 캘린더 태그 생성
        const mutsUseYearMonth = `${searchCondition.year}${(searchCondition.month + 1).toString().padStart(2, "0")}`;
        const mutCalendarTagList = monthArr.map((week, weekIdx) => (
            <tr key={weekIdx}>
                {week.map((day, dayIdx) => {
                    if (day === 0) return <td key={dayIdx}></td>;

                    const sDate = day.toString().padStart(2, "0");
                    const iUseDate = Number(`${mutsUseYearMonth}${sDate}`);
                    const daySchedules = scheduleList.filter((schedule) => {
                        const iBeginDate = Number(schedule.schdulBgnde.substring(0, 8));
                        const iEndDate = Number(schedule.schdulEndde.substring(0, 8));
                        return iUseDate >= iBeginDate && iUseDate <= iEndDate;
                    });

                    return (
                        <td key={dayIdx}>
                            <Link href={{ pathname: URL.ADMIN_CALENDAR_CREATE, query: { iUseDate } }} className="day">
                                {day}
                            </Link>
                            <br />
                            {daySchedules.map((schedule) => (
                                <Link
                                    href={{ pathname: URL.NEWS_CALENDAR_DETAIL, query: { schdulId: schedule.schdulId } }}
                                    key={schedule.schdulId}
                                >
                                    {schedule.schdulNm}
                                </Link>
                            ))}
                        </td>
                    );
                })}
            </tr>
        ));

        setCalendarTag(mutCalendarTagList);
    }, [searchCondition, scheduleList]);

    // Effect
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
                                        onClick={() => {
                                            changeDate(CODE.DATE_YEAR, -1);
                                        }}
                                    ></button>
                                    <span>{searchCondition.year}</span>
                                    <button
                                        className="next"
                                        onClick={() => {
                                            changeDate(CODE.DATE_YEAR, 1);
                                        }}
                                    ></button>
                                </li>
                                <li className="half R">
                                    <button
                                        className="prev"
                                        onClick={() => {
                                            changeDate(CODE.DATE_MONTH, -1);
                                        }}
                                    ></button>
                                    <span>{searchCondition.month + 1}</span>
                                    <button
                                        className="next"
                                        onClick={() => {
                                            changeDate(CODE.DATE_MONTH, 1);
                                        }}
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