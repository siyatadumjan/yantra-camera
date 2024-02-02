package com.online.yantra_system.projection;

import com.online.yantra_system.enums.BookingEnum;

public interface BookingProjection {
    Integer getQuantity();

    String getCategoryName();

    BookingEnum getStatus();

    String getEmail();

    Integer getId();

    Double getTotalPrice();

    String getFullName();

    String getItemName();
}
