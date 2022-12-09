package com.bsuir.kufar.entity;

import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Data
@ToString
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Category extends BaseEntity {
    private String name;
    private String iconName;
}
