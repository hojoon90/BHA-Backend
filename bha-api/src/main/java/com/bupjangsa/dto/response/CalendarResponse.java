package com.bupjangsa.dto.response;

import com.bupjangsa.domain.calendar.dto.CalendarDto;
import com.bupjangsa.type.CalendarType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CalendarResponse {

    @Getter
    @Builder
    public static class CalendarDetail {
        private Long calId;
        private String eventName;
        private CalendarType calendarType;
        private Long startDate;
        private Long endDate;

        public static CalendarResponse.CalendarDetail from(CalendarDto.CalendarInfo dto){
            return CalendarDetail.builder()
                    .calId(dto.getCalId())
                    .eventName(dto.getEventName())
                    .calendarType(dto.getCalendarType())
                    .startDate(dto.getStartDate())
                    .endDate(dto.getEndDate())
                    .build();
        }
    }

    @Getter
    @Builder
    public static class CalendarList {
        private List<CalendarDetail> calendarList;
        
        public static CalendarList of(List<CalendarDto.CalendarInfo> dtoList){
            final List<CalendarDetail> detailList = dtoList.stream().map(CalendarDetail::from).toList();
            return CalendarList.builder().calendarList(detailList).build();
        }

    }
}
