package com.bsuir.kufar.entity;

import com.bsuir.kufar.entity.enums.ProductStatus;
import com.bsuir.kufar.entity.model.ProductPhoto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Entity
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class Product extends BaseEntity{

    private String name;
    private String description;
    private Double price;
    private ProductStatus status;

    @Column(columnDefinition = "boolean default false")
    private boolean isExchanged;

    @OneToOne
    private Category category;

    @OneToOne
    private User creator;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date created;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastUpdated;

    @ElementCollection(targetClass = ProductPhoto.class)
    @CollectionTable(name = "product_photo", joinColumns = {@JoinColumn(name = "product_id")})
    private List<ProductPhoto> photos;
}



