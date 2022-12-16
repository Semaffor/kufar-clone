package com.bsuir.api.dto;

import com.bsuir.kufar.entity.enums.StatusCode;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
@Builder
public class UserDto {

    private Long id;
    private String login;
    private String registeredFromMessage;
    private String registrationDate;
    private Set<String> roles;
    private String lastVisit;
    private int totalAdv;
    private StatusCode statusCode;
    private boolean isBlocked;
    private String email;
}
