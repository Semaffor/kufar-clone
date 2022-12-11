package com.bsuir.kufar.service.impl;

import com.bsuir.kufar.entity.FavouriteProduct;
import com.bsuir.kufar.repository.*;
import com.bsuir.kufar.service.FavouriteProductService;
import com.bsuir.kufar.service.GenericService;
import org.springframework.stereotype.Service;

@Service
public class FavouriteProductImpl extends GenericService<FavouriteProduct> implements FavouriteProductService {

    private final FavouriteProductRepository favouriteProductRepository;

    public FavouriteProductImpl(BaseRepository<FavouriteProduct> genericRepository,
                                FavouriteProductRepository favouriteProductRepository) {
        super(genericRepository);
        this.favouriteProductRepository = favouriteProductRepository;
    }

    @Override
    public boolean isFavourite(Long userId, Long productId) {
        FavouriteProduct product = favouriteProductRepository.findByUserIdAndProductId(userId, productId);
        return product != null && product.isDeleted();
    }
}
