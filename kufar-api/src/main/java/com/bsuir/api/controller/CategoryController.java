package com.bsuir.api.controller;

import com.bsuir.api.dto.CategoryDto;
import com.bsuir.api.factory.CategoryDtoFactory;
import com.bsuir.kufar.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/category")
public class CategoryController {

    private final CategoryRepository categoryRepository;
    private final CategoryDtoFactory categoryDtoFactory;


    @GetMapping("")
    public List<CategoryDto> catalog() {
        return categoryDtoFactory.createDtoList(categoryRepository.findAll());
    }
}
