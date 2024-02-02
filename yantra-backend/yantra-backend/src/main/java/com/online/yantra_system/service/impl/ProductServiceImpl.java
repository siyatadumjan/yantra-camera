package com.online.yantra_system.service.impl;

import com.online.yantra_system.dto.request.ProductRequest;
import com.online.yantra_system.dto.response.CategoryItemResponse;
import com.online.yantra_system.dto.response.ProductResponse;
import com.online.yantra_system.entity.CategoryEntity;
import com.online.yantra_system.entity.ProductEntity;
import com.online.yantra_system.exception.ResourceNotFoundException;
import com.online.yantra_system.mapper.ProductMapper;
import com.online.yantra_system.repo.CategoryRepo;
import com.online.yantra_system.repo.ProductRepo;
import com.online.yantra_system.service.ProductService;
import com.online.yantra_system.utils.ImageToBase64;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepo productRepository;
    private final ProductMapper productMapper;
    private final CategoryRepo categoryRepository;
    ImageToBase64 imageToBase64 = new ImageToBase64();

//    private final String UPLOAD_DIRECTORY = new StringBuilder().append(System.getProperty("user.dir")).append("/image_uploads").toString();

    @Override
    public void save(ProductRequest itemEntity) throws IOException {
        Integer categoryId = itemEntity.getCategoryId();

        if (categoryId == null) {
            // Handle the case where categoryId is null (you can throw an exception or take appropriate action)
            throw new IllegalArgumentException("Category ID cannot be null");
        }

        CategoryEntity categoryEntity = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Invalid category id"));


        if (itemEntity.getImage() != null && !itemEntity.getImage().isEmpty()) {
            MultipartFile image = itemEntity.getImage();

            // Specify the directory where you want to save the image
            String uploadDirectory = "image_uploads";

            // Create the directory if it doesn't exist
            File directory = new File(uploadDirectory);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Save the image to the specified directory
            Path filePath = Paths.get(uploadDirectory, image.getOriginalFilename());
            Files.write(filePath, image.getBytes());

            // Save product details with image filename
            ProductEntity item = ProductEntity.builder()
                    .itemName(itemEntity.getItemName())
                    .availableQuantity(itemEntity.getAvailableQuantity())
                    .description(itemEntity.getDescription())
                    .price(itemEntity.getPrice())
                    .image(image.getOriginalFilename())
                    .categoryEntity(categoryEntity)
                    .build();

            productRepository.save(item);
        }
    }


    @Override
    public List<ProductResponse> getAllItem() {
        List<ProductResponse> products = productMapper.getAllProducts();
        products = products.stream().map(item -> {
            item.setImage(imageToBase64.getImageBase64(item.getImage()));
            return item;
        }).collect(Collectors.toList());
        return products;
    }

    @Override
    public ProductResponse getItemById(Long itemId) {
        ProductResponse item = productMapper.getItemById(itemId);
        item.setImage(imageToBase64.getImageBase64(item.getImage()));
        if (item.getImage() == null) {
            throw new ResourceNotFoundException("File does not exists.");
        }
        return item;
    }

    @Override
    public void deleteItem(Long itemId) {
        if (itemId == null) {
            throw new ResourceNotFoundException("Item id is required.");
        }
        ProductEntity existingItem = productRepository.findById(Math.toIntExact(itemId)).orElseThrow(() -> new ResourceNotFoundException("Item id does not exists."));

        String location = new StringBuilder().append("image_uploads").append("/").append(existingItem.getImage()).toString();
        File myFile = new File(location);
        if (myFile.exists()) {
            myFile.delete();
        } else {
            throw new ResourceNotFoundException("No Such File Exists.");
        }
        productRepository.deleteById(Math.toIntExact(itemId));
    }

    @Override
    public void updateItem(ProductRequest itemEntity) throws IOException {
        CategoryEntity categoryEntity = categoryRepository.findById(Math.toIntExact(itemEntity.getCategoryId())).orElseThrow(() -> new RuntimeException("Invalid category id"));
        StringBuilder fileNames = new StringBuilder();
        Path fileNameAndPath = Paths.get("image_uploads", itemEntity.getImage().getOriginalFilename());
        fileNames.append(itemEntity.getImage().getOriginalFilename());
        Files.write(fileNameAndPath, itemEntity.getImage().getBytes());

        productRepository.findById(Math.toIntExact(itemEntity.getId())).orElseThrow(() -> new ResourceNotFoundException("Item id does not exists."));

        ProductEntity item = ProductEntity.builder().id(itemEntity.getId()).itemName(itemEntity.getItemName()).availableQuantity(itemEntity.getAvailableQuantity()).description(itemEntity.getDescription()).price(itemEntity.getPrice()).image(itemEntity.getImage().getOriginalFilename()).categoryEntity(categoryEntity).build();
        productRepository.save(item);
    }

    @Override
    public List<ProductResponse> getItemListByCategoryId(Long categoryId) {
        List<ProductResponse> products = productMapper.getProductsListByCategoryId(categoryId);
        products = products.stream().map(item -> {
            item.setImage(imageToBase64.getImageBase64(item.getImage()));
            return item;
        }).collect(Collectors.toList());
        return products;
    }

    @Override
    public List<CategoryItemResponse> getItemAndCategory() {
        List<CategoryItemResponse> categories = productMapper.getAllProductsCategories();
        categories = categories.stream().map(category -> {
            List<ProductResponse> updatedProducts = category.getProductsList().stream().map(item -> {
                item.setImage(imageToBase64.getImageBase64(item.getImage()));
                return item;
            }).collect(Collectors.toList());
            category.setProductsList(updatedProducts);
            return category;
        }).collect(Collectors.toList());

//        categories = categories.stream().map(category -> {
//            category = category.getProductsList().stream().map(item -> {
//                item.setImage(imageToBase64.getImageBase64("/itemImage/" + item.getImage()));
//                return item;
//            })
//            return category;
//        }).collect(Collectors.toList());

        return categories;
    }
}
