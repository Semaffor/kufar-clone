package com.bsuir.api.dto;

import com.bsuir.kufar.entity.enums.Role;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class UserDto {

    private Long id;
    private String login;
    private String registeredFromMessage;
    private Set<Role> roles;
}
