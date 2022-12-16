package com.bsuir.api.dto;

import com.bsuir.kufar.entity.Category;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductDto {

    private Long id;
    private Long userId;
    private String productName;
    private Category category;
    private Long categoryId;
    private String description;
    private String price;
    private String priceUsd;
    private boolean isExchanged;
    private boolean isFavourite;
    private String created;

}
