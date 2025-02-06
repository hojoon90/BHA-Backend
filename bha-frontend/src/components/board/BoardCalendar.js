import CODE from "@/data/code";
import {useCallback, useEffect, useState} from "react";
import * as ExtApi from "@/lib/api";

function BoardCalendar(){
    const TODAY = new Date();
    const [calendarTag, setCalendarTag] = useState([]);
    const [scheduleList, setScheduleList] = useState([]);
    // State
    const [searchCondition, setSearchCondition] = useState({
        schdulSe: "",
        year: TODAY.getFullYear(),
        month: TODAY.getMonth() + 1, // 1월이 0부터 시작하므로 +1
    });

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
                            <span className="day">{day}</span>
                            {daySchedules.map((schedule) =>
                                <span key={schedule.calId}><br/><br/>{schedule.eventName}</span>
                            )}

                        </td>
                    );
                })}
            </tr>
        ));

        setCalendarTag(calendarTags);
    }, [searchCondition, scheduleList]);

    // Effects
    useEffect(() => {
        retrieveList();
    }, [retrieveList]);

    useEffect(() => {
        drawCalendar();
    }, [scheduleList, drawCalendar]);

    return(
        <div>
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
    )
}

export default BoardCalendar;