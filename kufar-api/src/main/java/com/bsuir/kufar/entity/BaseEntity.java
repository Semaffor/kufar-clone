package com.bsuir.kufar.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

@MappedSuperclass
@EqualsAndHashCode
@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseEntity {

    private final static long serialVersionUID = -6844085948760142053L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(columnDefinition = "boolean default false")
    private boolean isDeleted;
}
