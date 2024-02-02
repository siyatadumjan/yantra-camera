package com.online.yantra_system.mapper;

import com.online.yantra_system.dto.response.CategoryItemResponse;
import com.online.yantra_system.dto.response.ProductResponse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductMapper {
    List<ProductResponse> getAllProducts();

    List<CategoryItemResponse> getAllProductsCategories();

    List<ProductResponse> getProductsListByCategoryId(@Param("id") Long id);

    ProductResponse getItemById(@Param("id") Long id);
}
