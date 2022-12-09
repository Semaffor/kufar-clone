package com.bsuir.kufar.repository;

import com.bsuir.kufar.entity.Product;
import com.bsuir.kufar.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends BaseRepository<Product> {

}
