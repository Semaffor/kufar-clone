package com.bsuir.api.controller;

import com.bsuir.api.dto.ProductDto;
import com.bsuir.api.factory.ProductDtoFactory;
import com.bsuir.kufar.entity.Product;
import com.bsuir.kufar.entity.enums.ProductStatus;
import com.bsuir.kufar.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/product")
public class ProductController {

    private final ProductService productService;
    private final ProductDtoFactory productDtoFactory;

    @GetMapping("/l")
    public List<Product> getProducts(@RequestParam("status") ProductStatus status) {
        return productService.findAllWithStatus(status);
    }

    @GetMapping()
    public Map<String, Object> getProducts(
            @RequestParam(defaultValue = "0", name = "_page") int pageNum,
            @RequestParam(defaultValue = "2", name = "_limit") int limit,
            @RequestParam(defaultValue = "", name = "filter") String filter,
            @RequestParam(defaultValue = "0", name = "userId") Long userId,
            @RequestParam(defaultValue = "false", name = "order") boolean orderParam
    ) {

        Sort.Order order = orderParam ? Sort.Order.asc("created") : Sort.Order.desc("created");
        PageRequest pageRequest = PageRequest.of(pageNum, limit, Sort.by(order));
        Page<Product> page = productService.findAllWithFilter(pageRequest, filter);

        Map<String, Object> response = new HashMap<>();
        if (userId == 0) {
            response.put("products", productDtoFactory.createDtoList(page.getContent(), userId));
        } else {
            response.put("products", page.getContent());
        }
        response.put("currentPage", page.getNumber());
        response.put("totalItems", page.getTotalElements());
        response.put("totalPages", page.getTotalPages());

        return response;
    }

    @GetMapping("/{id}")
    public HashMap<String, Object> getProduct(@PathVariable Long id) {
        Product product = productService.findById(id);
        ProductDto dto = productDtoFactory.createDto(product);
        HashMap<String, Object> response = new HashMap<>();
        response.put("created", dto.getCreated());
        response.put("product", product);
        return response;
    }

    @PostMapping
    public Product saveProduct(@RequestBody ProductDto productDto) {
        return productService.saveProduct(productDto);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/{productId}/status")
    public boolean changeStatus(@PathVariable Long productId,
                                @RequestBody Map<String, ProductStatus> params) {
        return productService.changeStatus(productId, params.get("status"));
    }

}
