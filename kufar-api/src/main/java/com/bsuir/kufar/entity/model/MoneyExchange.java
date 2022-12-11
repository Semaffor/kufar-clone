package com.bsuir.kufar.entity.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;


@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MoneyExchange {

    @JsonAlias(value = "Cur_OfficialRate")
    private Double CurOfficialRate;
}
