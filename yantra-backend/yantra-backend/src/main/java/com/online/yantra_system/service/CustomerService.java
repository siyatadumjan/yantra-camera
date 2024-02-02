package com.online.yantra_system.service;

import com.online.yantra_system.dto.response.CustomerResponse;
import com.online.yantra_system.entity.CustomerEntity;
import com.online.yantra_system.dto.request.CustomerRequest;

import java.util.List;


public interface CustomerService {
    CustomerEntity saveCustomer(CustomerRequest customerRequest);
    CustomerEntity updateCustomer( CustomerRequest customerRequest);
    void deleteCustomer(Long id);
    List<CustomerResponse> getCustomers();
    CustomerResponse getCustomerById(Long id);
}
