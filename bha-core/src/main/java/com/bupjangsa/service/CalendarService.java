package com.bupjangsa.service;

import com.bupjangsa.domain.calendar.dto.CalendarDto;
import com.bupjangsa.domain.calendar.dto.CalendarDto.CalendarInfo;
import com.bupjangsa.domain.calendar.dto.CalendarDto.Register;
import com.bupjangsa.domain.calendar.dto.CalendarDto.Update;
import com.bupjangsa.domain.calendar.entity.Calendar;
import com.bupjangsa.domain.calendar.infra.CalendarRepository;
import com.bupjangsa.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final CalendarRepository calendarRepository;

    @Transactional
    public void registerCalendar(Register dto){
        calendarRepository.save(dto.toEntity());
    }

    @Transactional
    public void udpateCalendar(Update dto){
        Calendar entity = calendarRepository.findById(dto.getCalId())
                .orElseThrow(() -> new NotFoundException(""));

        entity.updateCalendarData(dto.getEventName(), dto.getStartDate(), dto.getEndDate());
    }

    public List<CalendarInfo> getCalendarInfoList(Long year, Long month){

        Long startDate = convertDate(year, month, "01");
        Long endDate = convertDate(year, month, "31");

        return calendarRepository.findCalendarList(startDate, endDate).stream()
                .map(CalendarInfo::from)
                .toList();
    }

    @Transactional
    public void deleteCalendar(Long calId){

        Calendar entity = calendarRepository.findById(calId)
                        .orElseThrow(() -> new NotFoundException(""));

        calendarRepository.delete(entity);
    }


    private Long convertDate(Long year, Long month, String date){
        String yearStr = String.valueOf(year);
        String monthStr = String.valueOf(month);
        return Long.parseLong(yearStr+monthStr+date);
    }
}
