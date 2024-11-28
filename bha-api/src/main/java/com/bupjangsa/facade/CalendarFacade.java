package com.bupjangsa.facade;

import com.bupjangsa.common.AppResponse;
import com.bupjangsa.domain.calendar.dto.CalendarDto.CalendarInfo;
import com.bupjangsa.dto.request.CalendarRequest.CalendarDeleteRequest;
import com.bupjangsa.dto.request.CalendarRequest.CalendarRegisterRequest;
import com.bupjangsa.dto.request.CalendarRequest.CalendarUpdateRequest;
import com.bupjangsa.dto.response.CalendarResponse.CalendarList;
import com.bupjangsa.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import static com.bupjangsa.domain.calendar.dto.CalendarDto.Register;
import static com.bupjangsa.domain.calendar.dto.CalendarDto.Update;

@Service
@RequiredArgsConstructor
public class CalendarFacade {

    private final CalendarService calendarService;

    public AppResponse<Void> registerCalendar(CalendarRegisterRequest request){

        Register register = Register.builder()
                .eventName(request.getEventName())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();

        calendarService.registerCalendar(register);
        return AppResponse.responseVoidSuccess(HttpStatus.CREATED.value());
    }

    public AppResponse<Void> updateCalendar(CalendarUpdateRequest request){
        Update update = Update.builder()
                .calId(request.getCalId())
                .eventName(request.getEventName())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();

        calendarService.udpateCalendar(update);
        return AppResponse.responseVoidSuccess(HttpStatus.OK.value());
    }

    public AppResponse<CalendarList> getCalendarList(long year, long month){
        if(year == 0) year = LocalDate.now().getYear();
        if(month == 0) month = LocalDate.now().getMonthValue();

        List<CalendarInfo> calendarInfoList = calendarService.getCalendarInfoList(year, month);
        return AppResponse.responseSuccess(CalendarList.of(calendarInfoList));
    }

    public AppResponse<Void> deleteCalendar(CalendarDeleteRequest request){
        calendarService.deleteCalendar(request.getCalId());
        return AppResponse.responseVoidSuccess(HttpStatus.NO_CONTENT.value());
    }
}
