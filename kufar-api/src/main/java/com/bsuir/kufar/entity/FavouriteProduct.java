package com.bsuir.kufar.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Data
@ToString
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class FavouriteProduct extends BaseEntity {
    @OneToOne(fetch = FetchType.LAZY)
    private User user;

    @OneToOne
    private Product product;

    @Temporal(TemporalType.DATE)
    private Date addedDate;
}
