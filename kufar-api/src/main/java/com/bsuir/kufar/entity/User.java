package com.bsuir.kufar.entity;

import com.bsuir.kufar.entity.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Entity
@Data
@ToString
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "usr")
public class User extends BaseEntity {

    private String login;
    private char[] password;

    @Temporal(TemporalType.DATE)
    private Date registrationDate;

    @ElementCollection(targetClass = Role.class)
    @CollectionTable(name = "user_role", joinColumns = {@JoinColumn(name = "user_id")})
    @Enumerated
    private Set<Role> roles;
}
