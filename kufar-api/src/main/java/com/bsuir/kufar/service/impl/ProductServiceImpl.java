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
import com.bsuir.kufar.service.GenericService;
import com.bsuir.kufar.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ProductServiceImpl extends GenericService<Product> implements ProductService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductServiceImpl(BaseRepository<Product> genericRepository, CategoryRepository categoryRepository,
                              ProductRepository productRepository, UserRepository userRepository) {
        super(genericRepository);
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
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
                .orElseThrow(() -> new NotFoundException(String.format("Категория с id = %d не найдена",
                        dto.getCategory().getId())));

        product.setName(dto.getProductName());
        product.setDescription(dto.getDescription());
        product.setExchanged(dto.isExchanged());
        product.setCategory(category);
        product.setCreated(new Date());
        product.setLastUpdated(new Date());

        User vendor = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new NotFoundException(String.format("Пользователь с id = %d не найден", dto.getUserId())));

        product.setCreator(vendor);
        if (dto.getPrice().equals("free") || dto.getPrice().equals("0")) {
            product.setPrice(0.0);
        } else {
            product.setPrice(Double.valueOf(dto.getPrice()));
        }
        product.setStatus(ProductStatus.MODERATING);

        return genericRepository.save(product);
    }

    @Override
    public Page<Product> findAllWithFilter(PageRequest pageRequest, String filter) {
        return productRepository.findByNameContainingIgnoreCaseAndStatus(pageRequest, filter, ProductStatus.ACTIVE);
    }

    @Override
    public boolean changeStatus(Long productId, ProductStatus status) {
        Product product = findById(productId);
        product.setStatus(status);
        productRepository.save(product);
        return true;
    }

    @Override
    public List<Product> findAllWithStatus(ProductStatus status) {
        return productRepository.findByStatus(status);
    }
}
