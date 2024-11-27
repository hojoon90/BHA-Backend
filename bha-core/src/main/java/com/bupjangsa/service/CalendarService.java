package com.bupjangsa.service;

import com.bupjangsa.domain.calendar.dto.CalendarDto;
import com.bupjangsa.domain.calendar.dto.CalendarDto.Register;
import com.bupjangsa.domain.calendar.infra.CalendarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final CalendarRepository calendarRepository;

    public void registerCalendar(Register dto){
        calendarRepository.save(dto.toEntity());
    }

}
