package com.bsuir.api.controller;

import com.bsuir.kufar.entity.Product;
import com.bsuir.kufar.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/product")
public class ProductController {

    private final ProductService productService;

    @GetMapping("")
    public Map<String, Object> getProducts(
            @RequestParam(defaultValue = "0", name = "_page") int pageNum,
            @RequestParam(defaultValue = "2", name = "_limit") int limit
    ) {
        System.out.println("Page: " + pageNum + "\nLimit:" + limit);
//        productService.save(Product.builder().description("eeee").build());
        PageRequest request = PageRequest.of(pageNum, limit, Sort.by(Sort.Order.asc("id")));

        Page<Product> page = productService.findAll(request);

        Map<String, Object> response = new HashMap<>();
        response.put("products", page.getContent());
        response.put("currentPage", page.getNumber());
        response.put("totalItems", page.getTotalElements());
        response.put("totalPages", page.getTotalPages());

        return response;
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productService.findById(id);
    }
}
