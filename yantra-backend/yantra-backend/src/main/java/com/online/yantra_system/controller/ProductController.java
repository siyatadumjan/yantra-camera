package com.online.yantra_system.controller;

import com.online.yantra_system.dto.request.ProductRequest;
import com.online.yantra_system.dto.response.CategoryItemResponse;
import com.online.yantra_system.dto.response.ProductResponse;
import com.online.yantra_system.helper.ApiResponse;
import com.online.yantra_system.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ApiResponse apiResponse;

    @GetMapping("/getAll")
    public ResponseEntity<Map<String, Object>> getAllProducts() {
        List<ProductResponse> products = productService.getAllItem();
        return apiResponse.successResponse("Products fetched successfully.", true, null, products);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Map<String, Object>> getItemById(@PathVariable Long id) {
        ProductResponse item = productService.getItemById(id);
        return apiResponse.successResponse("Item fetched successfully.", true, null, item);
    }

    @PostMapping("/save")
    public ResponseEntity<Map<String, Object>> saveItem(@RequestBody @ModelAttribute ProductRequest itemEntity) throws IOException {
//        if (itemEntity.getCategoryId() == null) {
//            return apiResponse.successResponse("Category id is required.", false, null,null);
//        }
        productService.save(itemEntity);
        return apiResponse.successResponse("Item saved successfully.", true, null, itemEntity.getId());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteItem(@PathVariable Long id) {
        productService.deleteItem(id);
        return apiResponse.successResponse("Item deleted successfully.", true, null, null);
    }

    @PutMapping("/update")
    public ResponseEntity<Map<String, Object>> updateItem(@RequestBody @ModelAttribute ProductRequest itemEntity) throws IOException {
        productService.updateItem(itemEntity);
        return apiResponse.successResponse("Item updated successfully.", true, null, itemEntity.getItemName());
    }

    @GetMapping("/categoryId/{categoryId}")
    public ResponseEntity<Map<String, Object>> getItemListByCategoryId(@PathVariable Long categoryId) {
        List<ProductResponse> products = productService.getItemListByCategoryId(categoryId);
        return apiResponse.successResponse("Item fetched successfully.", true, null, products);
    }

    @GetMapping("/category-list")
    public ResponseEntity<Map<String, Object>> getItemListAndCategory() {
        List<CategoryItemResponse> categoriesWithProducts = productService.getItemAndCategory();
        return apiResponse.successResponse("Category with item fetched successfully.", true, null, categoriesWithProducts);
    }

}
