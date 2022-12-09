package com.bsuir.kufar.service;

import com.bsuir.kufar.entity.BaseEntity;

import java.util.List;

public interface CrudOperations<T extends BaseEntity> {
    T findById(Long id);
    List<T> findAll();
    T save(T entity);
}
