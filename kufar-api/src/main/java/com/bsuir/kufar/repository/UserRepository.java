package com.bsuir.kufar.repository;

import com.bsuir.kufar.entity.User;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface UserRepository extends BaseRepository<User> {

    User findByLogin(String login);

    User findByEmail(String email);
    Mono<User> findMonoByLogin(String login);
}
