package com.bupjangsa.type;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum CalendarType {
    MEETING("meeting"),
    PRAY("pray"),
    EVENT("event")
    ;

    private final String key;
}
