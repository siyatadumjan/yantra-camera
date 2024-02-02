package com.online.yantra_system.entity;

import com.online.yantra_system.enums.BookingEnum;
import jakarta.persistence.*;
import lombok.*;

@Entity(name = "item_booking")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class BookingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne( fetch = FetchType.LAZY)
    @JoinColumn(name="customer_id", referencedColumnName = "id")
    private CustomerEntity customerEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="item_id", referencedColumnName = "id")
    private ProductEntity productEntity;

    private Integer quantity;

    @Column(name = "total_price")
    private Double totalPrice;

    @Enumerated(EnumType.STRING)
    private BookingEnum status;






}
