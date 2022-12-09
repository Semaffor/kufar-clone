package com.bsuir.api.factory;

import com.bsuir.api.dto.CategoryDto;
import com.bsuir.api.dto.UserDto;
import com.bsuir.kufar.entity.Category;
import com.bsuir.kufar.entity.User;
import com.bsuir.kufar.util.DateHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CategoryDtoFactory implements FactorySupport<Category, CategoryDto> {

    @Override
    public CategoryDto createDto(Category entity) {
        return CategoryDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .iconName(entity.getIconName())
                .build();
    }

    @Override
    public List<CategoryDto> createDtoList(List<Category> entityList) {
        return entityList.stream().map(this::createDto).collect(Collectors.toList());
    }
}
