package com.bupjangsa.controller;

import com.bupjangsa.common.AppResponse;
import com.bupjangsa.dto.request.CalendarRequest;
import com.bupjangsa.facade.CalendarFacade;
import com.bupjangsa.security.dto.AppUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.bupjangsa.dto.request.CalendarRequest.*;

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

}
