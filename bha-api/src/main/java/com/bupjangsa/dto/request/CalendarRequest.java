package com.bupjangsa.dto.request;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CalendarRequest {

    @Getter
    @Builder
    public static class CalendarRegisterRequest {

        private String eventName;
        private Long startDate;
        private Long endDate;

    }

    @Getter
    @Builder
    public static class CalendarUpdateRequest {

        private Long calId;
        private String eventName;
        private Long startDate;
        private Long endDate;

    }

    @Getter
    @Builder
    public static class CalendarDeleteRequest {
        private Long calId;
    }

}
