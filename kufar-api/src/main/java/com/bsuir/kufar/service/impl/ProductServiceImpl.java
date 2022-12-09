package com.bsuir.kufar.service.impl;

import com.bsuir.api.dto.ProductDto;
import com.bsuir.api.exception.NotFoundException;
import com.bsuir.kufar.entity.Category;
import com.bsuir.kufar.entity.Product;
import com.bsuir.kufar.entity.User;
import com.bsuir.kufar.entity.enums.ProductStatus;
import com.bsuir.kufar.repository.BaseRepository;
import com.bsuir.kufar.repository.CategoryRepository;
import com.bsuir.kufar.repository.ProductRepository;
import com.bsuir.kufar.repository.UserRepository;
import com.bsuir.kufar.service.CrudOperations;
import com.bsuir.kufar.service.GenericService;
import com.bsuir.kufar.service.ProductService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class ProductServiceImpl extends GenericService<Product> implements ProductService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public ProductServiceImpl(BaseRepository<Product> genericRepository, CategoryRepository categoryRepository,
                              UserRepository userRepository) {
        super(genericRepository);
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return genericRepository.findAll(pageable);
    }

    @Override
    @Transactional
    public Product saveProduct(ProductDto dto) {
        Product product = new Product();
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new NotFoundException(String.format("Категория с id = %d не найдена", dto.getCategoryId())));

        product.setName(dto.getProductName());
        product.setDescription(dto.getDescription());
        product.setExchanged(dto.isExchanged());
        product.setCategory(category);
        product.setCreated(new Date());
        product.setLastUpdated(new Date());

        User vendor = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new NotFoundException(String.format("Пользователь с id = %d не найден", dto.getUserId())));

        product.setCreator(vendor);
        if (dto.getPrice().equals("free")) {
            product.setPrice(0.0);
        } else {
            product.setPrice(Double.valueOf(dto.getPrice()));
        }
        product.setStatus(ProductStatus.MODERATING);

        return genericRepository.save(product);
    }
}
