package com.bsuir.kufar.entity;

import com.bsuir.kufar.entity.enums.ProductStatus;
import com.bsuir.kufar.entity.model.ProductPhoto;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@ToString
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Product extends BaseEntity{

    private String name;
    private String description;
    private Double price;
    private ProductStatus status;

    @Column(columnDefinition = "bit default 0::bit")
    private boolean isExchanged;

    @OneToOne
    private Category category;

    @OneToOne
    private User creator;

    @ElementCollection(targetClass = ProductPhoto.class)
    @CollectionTable(name = "product_photo", joinColumns = {@JoinColumn(name = "product_id")})
    private List<ProductPhoto> photos;
}



