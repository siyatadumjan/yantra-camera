package com.online.yantra_system.dto.response;

import com.online.yantra_system.enums.BookingEnum;
import lombok.Data;

@Data
public class BookingResponse {
      private Integer quantity;

      private String categoryName;

      private BookingEnum status;

      private String email;

      private Integer id;

      private Double totalPrice;

      private String fullName;

      private String itemName;
}
