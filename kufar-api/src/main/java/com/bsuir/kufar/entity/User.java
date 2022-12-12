package com.bsuir.kufar.entity;

import com.bsuir.kufar.entity.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Entity
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "usr")
@JsonIgnoreProperties(ignoreUnknown = true)
public class User extends BaseEntity {

    @NonNull
    private String login;
    private char[] password;

    private String email;

    @Temporal(TemporalType.DATE)
    private Date registrationDate;

    @Temporal(TemporalType.DATE)
    private Date lastVisit;

    @Column(columnDefinition = "boolean default false")
    private boolean isBlocked;

    @Column(columnDefinition = "boolean default false")
    private boolean isActivated;

    @ElementCollection(targetClass = Role.class)
    @CollectionTable(name = "user_role", joinColumns = {@JoinColumn(name = "user_id")})
    @Enumerated
    private Set<Role> roles;

}
