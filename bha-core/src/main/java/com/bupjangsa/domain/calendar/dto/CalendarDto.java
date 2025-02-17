package com.bupjangsa.domain.calendar.dto;

import com.bupjangsa.domain.calendar.entity.Calendar;
import com.bupjangsa.type.CalendarType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CalendarDto {

    @Getter
    @Builder
    public static class Register{
        private String eventName;
        private CalendarType calendarType;
        private Long startDate;
        private Long endDate;

        public Calendar toEntity(){
            return Calendar.builder()
                    .eventName(eventName)
                    .calendarType(calendarType)
                    .startDate(startDate)
                    .endDate(endDate)
                    .build();
        }
    }

    @Getter
    @Builder
    public static class Update{
        private Long calId;
        private CalendarType calendarType;
        private String eventName;
        private Long startDate;
        private Long endDate;
    }

    @Getter
    @Builder
    public static class CalendarInfo {

        private Long calId;
        private String eventName;
        private CalendarType calendarType;
        private Long startDate;
        private Long endDate;
//        private String createdBy;
//        private LocalDateTime createdAt;

        public static CalendarDto.CalendarInfo from(Calendar entity) {
            return CalendarInfo.builder()
                    .calId(entity.getCalId())
                    .eventName(entity.getEventName())
                    .calendarType(entity.getCalendarType())
                    .startDate(entity.getStartDate())
                    .endDate(entity.getEndDate())
//                    .createdAt(entity.getCreatedAt())
                    .build();
        }

    }


}
