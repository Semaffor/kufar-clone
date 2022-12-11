package com.bsuir.kufar.service;

import com.bsuir.kufar.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import reactor.core.publisher.Mono;

public interface UserService  extends CrudOperations<User>{
    boolean changeIsFavouriteProduct(Long userId, Long productId);

    boolean regNewUser(User user);

    boolean activateAccountByCode(String uuid);

    boolean recoverPasswordByEmail(String email);

    Mono<UserDetails> findByLogin(String username);
}
