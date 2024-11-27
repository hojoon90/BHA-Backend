package com.bupjangsa.facade;

import com.bupjangsa.common.AppResponse;
import com.bupjangsa.dto.request.CalendarRequest.CalendarRegisterRequest;
import com.bupjangsa.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import static com.bupjangsa.domain.calendar.dto.CalendarDto.Register;

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



}
