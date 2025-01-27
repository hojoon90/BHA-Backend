package com.bupjangsa.controller;

import com.bupjangsa.dto.AppResponse;
import com.bupjangsa.dto.response.CalendarResponse.CalendarList;
import com.bupjangsa.facade.CalendarFacade;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static com.bupjangsa.dto.request.CalendarRequest.*;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/calendar")
public class CalendarController {

    private final CalendarFacade calendarFacade;

    @PostMapping
    public ResponseEntity<AppResponse<Void>> registCalendar(
            @RequestBody final CalendarRegisterRequest request){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(calendarFacade.registerCalendar(request));
    }

    @PutMapping
    public ResponseEntity<AppResponse<Void>> updateCalendar(
            @RequestBody final CalendarUpdateRequest request
    ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(calendarFacade.updateCalendar(request));
    }

    //https://cotak.tistory.com/321
    @GetMapping("/eventList")
    public ResponseEntity<AppResponse<CalendarList>> getCalendarList(
            @RequestParam("year") @NotNull(message = "공백일 수 없습니다.") final Long year,
            @RequestParam("month") @NotNull(message = "공백일 수 없습니다.") final Long month
    ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(calendarFacade.getCalendarList(year, month));
    }

    @DeleteMapping
    public ResponseEntity<AppResponse<Void>> deleteCalendarList(
            @RequestBody final CalendarDeleteRequest request
    ) {
        return  ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(calendarFacade.deleteCalendar(request));
    }

}
