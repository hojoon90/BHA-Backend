package com.bupjangsa.domain.calendar.infra;

import com.bupjangsa.domain.calendar.entity.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {

    @Query("select c from Calendar c " +
            "where c.startDate >= :startDate " +
            "and c.endDate <= :endDate ")
    List<Calendar> findCalendarList(@Param("startDate") Long startDate, @Param("endDate") Long endDate);
}
