package com.bsuir.api.factory;

import java.util.List;
import java.util.stream.Collectors;

public interface DtoFactorySupport<T, R> {
    default T createFromDto(R entityDto) {
        throw new UnsupportedOperationException();
    }
    default R createDto(T entity) {
        throw new UnsupportedOperationException();
    }
    default List<R> createDtoList(List<T> entityList) {
        return entityList.stream().map(this::createDto).collect(Collectors.toList());
    }
}
