package com.bsuir.api.factory;

import com.bsuir.api.dto.UserDto;
import com.bsuir.kufar.entity.User;
import com.bsuir.kufar.entity.enums.StatusCode;
import com.bsuir.kufar.util.DateHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserDtoFactory implements DtoFactorySupport<User, UserDto> {

    private final DateHandler dateHandler;

    @Override
    public UserDto createDto(User entity) {
        UserDto dto = UserDto.builder()
                .id(entity.getId())
                .login(entity.getLogin())
                .roles(entity.getRoles())
                .build();
        dto.setRegisteredFromMessage(dateHandler.convertDateToMouthAndYear(entity.getRegistrationDate()));
        dto.setStatusCode(handleStatusCode(entity));
        return dto;
    }

    private StatusCode handleStatusCode(User entity) {
        if (!entity.isActivated()) {
            return StatusCode.ACCOUNT_NOT_ACTIVATED;
        } else if (entity.isDeleted()) {
            return StatusCode.ACCOUNT_DELETED;
        } else if (entity.isBlocked()) {
            return StatusCode.ACCOUNT_BAN;
        }
        return StatusCode.OK;
    }

    @Override
    public List<UserDto> createDtoList(List<User> entityList) {
        return entityList.stream().map(this::createDto).collect(Collectors.toList());
    }
}
