package com.bsuir.kufar.service;

import com.bsuir.api.exception.NotFoundException;
import com.bsuir.kufar.entity.BaseEntity;
import com.bsuir.kufar.repository.BaseRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public class GenericService<T extends BaseEntity> implements CrudOperations<T> {

    @NonNull
    protected final BaseRepository<T> genericRepository;

    public GenericService(@NonNull BaseRepository<T> genericRepository) {
        this.genericRepository = genericRepository;
    }

    @Override
    public T findById(Long id) {
        return genericRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Сущность с id = %d не найдена", id)));
    }

    @Override
    public List<T> findAll() {
        return genericRepository.findAll();
    }

    @Override
    public T save(T entity) {
        return genericRepository.save(entity);
    }
}
