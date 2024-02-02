package com.online.yantra_system.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class CategoryItemResponse {
    private Long id;

    private String categoryName;

    private List<ProductResponse> productsList;
}
