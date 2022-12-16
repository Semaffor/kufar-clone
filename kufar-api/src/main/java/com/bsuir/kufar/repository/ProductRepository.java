package com.bsuir.kufar.repository;

import com.bsuir.kufar.entity.Product;
import com.bsuir.kufar.entity.enums.ProductStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends BaseRepository<Product> {

    Page<Product> findByNameContainingIgnoreCaseAndStatus(Pageable pageable, String filter, ProductStatus status);

    List<Product> findByStatus(ProductStatus status);
}
