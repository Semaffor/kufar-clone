package com.bsuir.kufar.repository;

import com.bsuir.kufar.entity.UserCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCodeRepository extends JpaRepository<UserCode, Long> {
    UserCode findByCode(String code);
}
