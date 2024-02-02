package com.online.yantra_system.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Data
public class ProductRequest {
    private Integer id;

    @NotNull
    private String itemName;

    @NotNull
    private Integer availableQuantity;

    private String description;

    @NotNull
    private Double price;

    @NotNull
    private MultipartFile image;

    private Integer categoryId;
}
