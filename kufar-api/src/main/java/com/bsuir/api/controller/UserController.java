package com.bsuir.api.controller;

import com.bsuir.api.dto.UserDto;
import com.bsuir.api.factory.UserDtoFactory;
import com.bsuir.kufar.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;
    private final UserDtoFactory userDtoFactory;

    @GetMapping("/user/{id}")
    private UserDto getUser(@PathVariable Long id) {
        return userDtoFactory.createDto(userService.findById(id));
    }
}
