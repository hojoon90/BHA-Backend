package com.bupjangsa.domain.calendar.dto;

import com.bupjangsa.domain.calendar.entity.Calendar;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CalendarDto {

    @Getter
    @Builder
    public static class Register{
        private String eventName;
        private Long startDate;
        private Long endDate;

        public Calendar toEntity(){
            return Calendar.builder()
                    .eventName(eventName)
                    .startDate(startDate)
                    .endDate(endDate)
                    .build();
        }
    }

    @Getter
    @Builder
    public static class Update{
        private Long calId;
        private String eventName;
        private Long startDate;
        private Long endDate;
    }

    @Getter
    @Builder
    public static class CalendarInfo {

        private Long calId;
        private String eventName;
        private Long startDate;
        private Long endDate;
//        private String createdBy;
//        private LocalDateTime createdAt;

        public static CalendarDto.CalendarInfo from(Calendar entity) {
            return CalendarInfo.builder()
                    .calId(entity.getCalId())
                    .eventName(entity.getEventName())
                    .startDate(entity.getStartDate())
                    .endDate(entity.getEndDate())
//                    .createdAt(entity.getCreatedAt())
                    .build();
        }

    }


}
