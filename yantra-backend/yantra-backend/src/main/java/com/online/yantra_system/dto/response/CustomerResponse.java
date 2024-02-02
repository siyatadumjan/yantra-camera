package com.online.yantra_system.dto.response;

import lombok.Data;

@Data
public class CustomerResponse {
    Long id;

    String fullName;

    String phoneNumber;

    String address;

    String email;
}
