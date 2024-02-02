package com.online.yantra_system.service;

import com.online.yantra_system.dto.request.BookingRequest;
import com.online.yantra_system.dto.response.BookingResponse;
import com.online.yantra_system.enums.BookingEnum;
import com.online.yantra_system.projection.BookingProjection;

import java.util.List;

public interface BookingService {

    Integer saveBooking(BookingRequest bookingRequest);

    List<BookingResponse> getBooking();

     Integer cancelBooking(Integer id);

    List<BookingEnum> getBookingEnums();

    List<BookingProjection> getBookingById(Integer id);

    Integer updateBooking(BookingRequest bookingRequest);
}
