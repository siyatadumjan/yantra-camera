package com.online.yantra_system.service.impl;

import com.online.yantra_system.dto.request.CategoryRequest;
import com.online.yantra_system.entity.CategoryEntity;
import com.online.yantra_system.exception.ResourceNotFoundException;
import com.online.yantra_system.repo.CategoryRepo;
import com.online.yantra_system.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepo categoryRepository;

    @Override
    public void save(CategoryRequest categoryEntity) {
        CategoryEntity category = CategoryEntity.builder()
                .categoryName(categoryEntity.getCategoryName())
                .build();
        categoryRepository.save(category);
    }

    @Override
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public CategoryEntity getCategoryById(Integer categoryId) {
        return categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category id does not exists."));
    }

    @Override
    public void deleteCategory(Integer categoryId) {
        if (categoryId == null) {
            throw new IllegalArgumentException("Category id is required.");
        }
        categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category id does not exists."));
        categoryRepository.deleteById(categoryId);
    }

    @Override
    public void updateCategory(CategoryRequest categoryEntity) {
        if (categoryEntity.getId() == null) {
            throw new IllegalArgumentException("Category d is required.");
        }
        CategoryEntity existingCategory = categoryRepository.findById(categoryEntity.getId()).orElseThrow(() -> new ResourceNotFoundException("Category id does not exists."));
        existingCategory.setCategoryName(categoryEntity.getCategoryName());
        categoryRepository.save(existingCategory);
    }
}
