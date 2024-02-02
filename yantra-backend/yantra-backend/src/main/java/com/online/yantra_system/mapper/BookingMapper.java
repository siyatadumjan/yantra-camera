package com.online.yantra_system.mapper;

import com.online.yantra_system.dto.response.BookingResponse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BookingMapper {
    @Select("select ib.id, ce.full_name, ce.email, c.category_name, i.item_name, ib.quantity , ib.total_price, ib.status  from item_booking ib \n" +
            "inner join customer_entity ce on ib.customer_id = ce.id\n" +
            "inner join products i on i.id = ib.item_id\n" +
            "inner join category c on c.id = i.category_id")
    List<BookingResponse> getAll();
}
