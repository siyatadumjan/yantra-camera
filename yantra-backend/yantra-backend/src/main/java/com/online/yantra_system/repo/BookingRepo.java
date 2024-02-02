package com.online.yantra_system.repo;

import com.online.yantra_system.entity.BookingEntity;
import com.online.yantra_system.projection.BookingProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingRepo extends JpaRepository<BookingEntity,Integer> {

    @Query(nativeQuery = true, value = "select ib.id, ce.full_name as fullName, ce.email, c.category_name as categoryName, i.item_name as itemName, ib.quantity , ib.total_price as totalPrice, ib.status  from item_booking ib \n" +
            "inner join customer_entity ce on ib.customer_id = ce.id\n" +
            "inner join products i on i.id = ib.item_id\n" +
            "inner join category c on c.id = i.category_id \n" +
            "where ib.id = ?1")
    List<BookingProjection> getBookingEntitiesById(Integer id);
}
