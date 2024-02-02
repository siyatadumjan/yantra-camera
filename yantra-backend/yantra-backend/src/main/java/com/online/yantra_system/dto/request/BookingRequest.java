package com.online.yantra_system.dto.request;

import lombok.Data;

import javax.validation.constraints.NotNull;


@Data
public class BookingRequest {

    private Integer id;

    @NotNull
    private Long customerId;

    @NotNull
    private Integer itemId;

    @NotNull
    private Integer quantity;

    private Double totalPrice;

    private String status;
}
