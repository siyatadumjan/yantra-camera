package com.online.yantra_system.service;

import com.online.yantra_system.dto.request.CategoryRequest;
import com.online.yantra_system.entity.CategoryEntity;

import java.util.List;

public interface CategoryService {
    void save(CategoryRequest categoryEntity);
    List<CategoryEntity> getAllCategories();
    CategoryEntity getCategoryById(Integer categoryId);
    void deleteCategory(Integer categoryId);
    void updateCategory(CategoryRequest categoryEntity);
}
