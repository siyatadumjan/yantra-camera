package com.online.yantra_system.controller;

import com.online.yantra_system.dto.request.CategoryRequest;
import com.online.yantra_system.entity.CategoryEntity;
import com.online.yantra_system.helper.ApiResponse;
import com.online.yantra_system.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final ApiResponse apiResponse;

    @GetMapping("/getAll")
    public ResponseEntity<Map<String, Object>> getAllCategories() {
        List<CategoryEntity> products = categoryService.getAllCategories();
        return apiResponse.successResponse("Catogories fetched successfully.", true, null, products);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Map<String, Object>> getCategoryById(@PathVariable Integer id) {
        CategoryEntity item = categoryService.getCategoryById(id);
        return apiResponse.successResponse("Category fetched successfully.", true, null, item);
    }

    @PostMapping("/save")
    public ResponseEntity<Map<String, Object>> saveCategory(@RequestBody CategoryRequest categoryEntity) {
        categoryService.save(categoryEntity);
        return apiResponse.successResponse("Category saved successfully.", true, null, categoryEntity.getId());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteCategory(@PathVariable Integer id) {
        categoryService.deleteCategory(id);
        return apiResponse.successResponse("Category deleted successfully.", true, null, null);
    }

    @PutMapping("/update")
    public ResponseEntity<Map<String, Object>> updateCategory(@RequestBody CategoryRequest categoryEntity) {
        categoryService.updateCategory(categoryEntity);
        return apiResponse.successResponse("Category updated successfully.", true, null, categoryEntity);
    }
}
