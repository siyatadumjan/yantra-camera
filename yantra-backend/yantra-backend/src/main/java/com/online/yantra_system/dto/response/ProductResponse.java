package com.online.yantra_system.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
public class ProductResponse {
    private Long id;

    private String itemName;

    private Integer availableQuantity;

    private String description;

    private Double price;

    private String image;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer categoryId;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String categoryName;
}
