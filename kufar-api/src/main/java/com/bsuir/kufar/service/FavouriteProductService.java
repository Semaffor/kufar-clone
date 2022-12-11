package com.bsuir.kufar.service;

import com.bsuir.api.dto.ProductDto;
import com.bsuir.kufar.entity.FavouriteProduct;
import com.bsuir.kufar.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public interface FavouriteProductService extends CrudOperations<FavouriteProduct> {
    boolean isFavourite(Long userId, Long productId);
}
