package com.bsuir.kufar.entity;

import jakarta.persistence.*;
import lombok.*;

@MappedSuperclass
@EqualsAndHashCode
@ToString
@Data
@NoArgsConstructor
public class BaseEntity {

    private final static long serialVersionUID = -6844085948760142053L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(columnDefinition = "bit default 0::bit")
    private boolean isDeleted;
}
