package com.bsuir.kufar.entity;

import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Data
@ToString
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Filter extends BaseEntity {
    private String searchingString;
    private double priceRangeBegin;
    private double priceRangeEnd;
}
