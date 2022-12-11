package com.bsuir.kufar.service;

import com.bsuir.api.dto.ProductDto;
import com.bsuir.kufar.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public interface ProductService extends CrudOperations<Product> {
    Page<Product> findAll(Pageable pageable);

    Product saveProduct(ProductDto productDto);

    Page<Product> findAllWithFilter(PageRequest pageRequest, String filter);
}
