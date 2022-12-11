package com.bsuir.kufar.repository;

import com.bsuir.kufar.entity.FavouriteProduct;
import com.bsuir.kufar.entity.Product;
import com.bsuir.kufar.entity.User;

public interface FavouriteProductRepository extends BaseRepository<FavouriteProduct> {

    FavouriteProduct findByUserAndProduct(User user, Product product);
    FavouriteProduct findByUserIdAndProductId(Long user, Long product);
}
