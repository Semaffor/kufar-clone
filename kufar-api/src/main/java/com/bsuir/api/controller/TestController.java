package com.bsuir.api.controller;

import com.bsuir.api.exception.NotFoundException;
import com.bsuir.kufar.entity.User;
import com.bsuir.kufar.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    private final UserRepository userRepository;

    public TestController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
//        userRepository.save(new User("Dima"));
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Пользователь с id = %d не существует", id)));
    }
}
