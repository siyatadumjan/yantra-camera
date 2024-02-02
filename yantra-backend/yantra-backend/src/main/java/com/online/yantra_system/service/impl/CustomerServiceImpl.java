package com.online.yantra_system.service.impl;

import com.online.yantra_system.dto.response.CustomerResponse;
import com.online.yantra_system.entity.CustomerEntity;
import com.online.yantra_system.exception.ResourceNotFoundException;
import com.online.yantra_system.mapper.CustomerMapper;
import com.online.yantra_system.repo.CustomerRepo;
import com.online.yantra_system.dto.request.CustomerRequest;
import com.online.yantra_system.service.CustomerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepo customerRepo;
    private final CustomerMapper customerMapper;

    public CustomerServiceImpl(CustomerRepo customerRepo, CustomerMapper customerMapper) {
        this.customerRepo = customerRepo;
        this.customerMapper = customerMapper;
    }

    @Override
    public CustomerEntity saveCustomer(CustomerRequest customerRequest) {
        CustomerEntity customerEntity = new CustomerEntity(customerRequest);
        return customerRepo.save(customerEntity);
    }

    @Override
    public CustomerEntity updateCustomer(CustomerRequest customerRequest) {
        if (customerRequest.getId() == null) {
            throw new IllegalArgumentException("Customer Id is required.");
        }
        CustomerEntity existingCustomer = customerRepo.findById(customerRequest.getId()).orElseThrow(() -> new ResourceNotFoundException("Customer Id does not exists."));
        existingCustomer.setFullName(customerRequest.getFullName());
        existingCustomer.setAddress(customerRequest.getAddress());
        existingCustomer.setPhoneNumber(customerRequest.getPhoneNumber());
        existingCustomer.setEmail(customerRequest.getEmail());
        return customerRepo.save(existingCustomer);
    }

    @Override
    public void deleteCustomer(Long id) {
        customerRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Customer Id does not exists."));
        customerRepo.deleteById(id);
    }

    @Override
    public List<CustomerResponse> getCustomers() {
        return customerMapper.getCustomers();
    }

    @Override
    public CustomerResponse getCustomerById(Long id) {
        customerRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Customer Id does not exists."));
        return customerMapper.getCustomerById(id);
    }
}
