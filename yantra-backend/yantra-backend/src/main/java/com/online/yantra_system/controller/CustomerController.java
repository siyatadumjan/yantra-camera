package com.online.yantra_system.controller;

import com.online.yantra_system.dto.request.CustomerRequest;
import com.online.yantra_system.entity.CustomerEntity;
import com.online.yantra_system.helper.ApiResponse;
import com.online.yantra_system.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    private final CustomerService customerService;
    private final ApiResponse apiResponse;

    public CustomerController(CustomerService customerService, ApiResponse apiResponse) {
        this.customerService = customerService;
        this.apiResponse = apiResponse;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> saveCustomer(@RequestBody CustomerRequest customerRequest) {
        CustomerEntity customerEntity = this.customerService.saveCustomer(customerRequest);
        return apiResponse.successResponse("Customers saved successfully.", true, null, customerEntity.getId());
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getCustomers() {
        return apiResponse.successResponse("Customers fetched successfully.", true, null, this.customerService.getCustomers());
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateCustomer(@RequestBody CustomerRequest customerRequest) {
        CustomerEntity customerEntity = this.customerService.updateCustomer(customerRequest);
        return apiResponse.successResponse("Customers updated successfully.", true, null, customerEntity);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Map<String, Object>> deleteCustomer(@PathVariable Long id) {
        this.customerService.deleteCustomer(id);
        return apiResponse.successResponse("Customers deleted successfully.", true, null, null);
    }

    @GetMapping("{id}")
    public ResponseEntity<Map<String, Object>> getCustomerById(@PathVariable Long id) {

        return apiResponse.successResponse("Customer fetched successfully.", true, null, this.customerService.getCustomerById(id));
    }
}
