package com.bupjangsa.domain.calendar.entity;

import com.bupjangsa.domain.common.BaseEntity;
import com.bupjangsa.type.CalendarType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.annotations.Where;

import static lombok.AccessLevel.PROTECTED;

@Getter
@Entity
@SuperBuilder
@Table(name = "t_calendar")
@SQLDelete(sql = "UPDATE t_calendar SET deleted = true where user_id = ?")
@SQLRestriction("deleted = false")  //삭제가 아닌 유저만 조회하도록 조건처리
@NoArgsConstructor(access = PROTECTED)
public class Calendar extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long calId;

    @Column(nullable = false)
    private String eventName;

    @Column(nullable = false)
    private CalendarType calendarType;

    @Column(nullable = false)
    private Long startDate;

    @Column(nullable = false)
    private Long endDate;

    public void updateCalendarData(String eventName, CalendarType calendarType, Long startDate, Long endDate){
        this.eventName = eventName;
        this.calendarType = calendarType;
        this.startDate = startDate;
        this.endDate = endDate;
    }

}
