package com.bsuir.api.factory;

import java.util.List;

public interface FactorySupport<T, R> {
    default T createFromDto(R entityDto) {
        throw new UnsupportedOperationException();
    }
    default R createDto(T entity) {
        throw new UnsupportedOperationException();
    }
    default List<R> createDtoList(List<T> entityList) {
        throw new UnsupportedOperationException();
    }
}
