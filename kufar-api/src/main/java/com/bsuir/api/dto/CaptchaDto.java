package com.bsuir.api.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.Set;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CaptchaDto {
    private boolean success;
    @JsonAlias("error-codes")
    private Set<String> errors;
}
