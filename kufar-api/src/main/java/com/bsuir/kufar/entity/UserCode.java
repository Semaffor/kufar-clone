package com.bsuir.kufar.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserCode {

    private final static long serialVersionUID = -6844085948760142053L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String code;

    @OneToOne
    private User user;

    public UserCode(String code, User user) {
        this.code = code;
        this.user = user;
    }
}
