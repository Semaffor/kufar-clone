package com.bsuir.kufar.service.impl;

import com.bsuir.kufar.entity.Product;
import com.bsuir.kufar.repository.BaseRepository;
import com.bsuir.kufar.repository.ProductRepository;
import com.bsuir.kufar.service.CrudOperations;
import com.bsuir.kufar.service.GenericService;
import com.bsuir.kufar.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl extends GenericService<Product> implements ProductService {

    public ProductServiceImpl(ProductRepository productRepository) {
        super(productRepository);
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return genericRepository.findAll(pageable);
    }
}
