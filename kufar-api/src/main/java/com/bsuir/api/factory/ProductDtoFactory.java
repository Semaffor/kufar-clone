package com.bsuir.api.factory;

import com.bsuir.api.dto.ProductDto;
import com.bsuir.kufar.entity.Product;
import com.bsuir.kufar.service.CurrencyService;
import com.bsuir.kufar.service.FavouriteProductService;
import com.bsuir.kufar.util.DateHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ProductDtoFactory implements DtoFactorySupport<Product, ProductDto> {

    private final FavouriteProductService favouriteProductService;
    private final CurrencyService currencyService;
    private final DateHandler dateHandler;

    public ProductDto createDto(Product entity, Long userId) {
        ProductDto dto = ProductDto.builder()
                .id(entity.getId())
                .productName(entity.getName())
                .category(entity.getCategory())
                .description(entity.getDescription())
                .isExchanged(entity.isExchanged())
                .build();

        dto.setCreated(dateHandler.getDataForProduct(entity.getCreated()));
        if (entity.getPrice() == 0) {
            dto.setPrice("free");
            dto.setPriceUsd("");
        } else {
            dto.setPrice(String.valueOf(entity.getPrice()));
            int presisedPriceUsd = BigDecimal.valueOf(entity.getPrice() / currencyService.getCurrentUsdExchange())
                            .setScale(0, RoundingMode.HALF_UP)
                                    .intValue();
            dto.setPriceUsd(
                    String.valueOf(presisedPriceUsd));
        }
        if (userId != null) {
            dto.setFavourite(favouriteProductService.isFavourite(userId, entity.getId()));
        }
        return dto;
    }

    @Override
    public ProductDto createDto(Product entity) {
        return createDto(entity, null);
    }

    public List<ProductDto> createDtoList(List<Product> entityList, Long userId) {
        return entityList.stream().map(e -> createDto(e, userId)).collect(Collectors.toList());
    }
}
