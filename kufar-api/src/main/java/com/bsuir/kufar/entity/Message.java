package com.bsuir.kufar.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.*;

@Entity
@Data
@ToString
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Message extends BaseEntity {

    @OneToOne
    private User sender;

    @OneToOne
    private User receiver;

    @OneToOne
    private Product product;

    private String message;
}



