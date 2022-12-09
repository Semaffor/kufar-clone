package com.bsuir.api.factory;

import com.bsuir.api.dto.UserDto;
import com.bsuir.kufar.entity.User;
import com.bsuir.kufar.util.DateHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserDtoFactory implements FactorySupport<User, UserDto> {

    private final DateHandler dateHandler;

    @Override
    public UserDto createDto(User entity) {
        UserDto dto = UserDto.builder()
                .id(entity.getId())
                .login(entity.getLogin())
                .roles(entity.getRoles())
                .build();
        dto.setRegisteredFromMessage(dateHandler.convertDateToMouthAndYear(entity.getRegistrationDate()));
        return dto;
    }

    @Override
    public List<UserDto> createDtoList(List<User> entityList) {
        return entityList.stream().map(this::createDto).collect(Collectors.toList());
    }
}
