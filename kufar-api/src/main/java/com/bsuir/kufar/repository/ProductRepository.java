package com.bsuir.kufar.repository;

import com.bsuir.kufar.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends BaseRepository<Product> {

    Page<Product> findByNameContainingIgnoreCase(Pageable pageable, String filter);
}
