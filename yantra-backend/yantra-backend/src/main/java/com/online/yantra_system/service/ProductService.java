package com.online.yantra_system.service;

import com.online.yantra_system.dto.request.ProductRequest;
import com.online.yantra_system.dto.response.CategoryItemResponse;
import com.online.yantra_system.dto.response.ProductResponse;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    void save(ProductRequest itemEntity) throws IOException;
    List<ProductResponse> getAllItem();
    ProductResponse getItemById(Long itemId);
    void deleteItem(Long itemId);
    void updateItem(ProductRequest itemEntity) throws IOException;
    List<ProductResponse> getItemListByCategoryId(Long categoryId);
    List<CategoryItemResponse> getItemAndCategory();
}
