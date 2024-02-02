package com.online.yantra_system.mapper;

import com.online.yantra_system.dto.response.CustomerResponse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CustomerMapper {
    List<CustomerResponse> getCustomers();

    CustomerResponse getCustomerById(@Param("id") Long id);
}
