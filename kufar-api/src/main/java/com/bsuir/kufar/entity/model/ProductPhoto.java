package com.bsuir.kufar.entity.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Embeddable
@Data
@ToString
@NoArgsConstructor
public class ProductPhoto {

    private String photoName;
}
