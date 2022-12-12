package com.bsuir.kufar.service;

import com.bsuir.api.dto.UserDto;
import com.bsuir.kufar.entity.User;

import java.util.ArrayList;
import java.util.HashMap;
//import org.springframework.security.core.userdetails.UserDetails;

public interface UserService  extends CrudOperations<User>{
    boolean changeIsFavouriteProduct(Long userId, Long productId);

    boolean regNewUser(User user);

    boolean activateAccountByCode(String uuid);

    boolean recoverPasswordByEmail(String email);

//    Mono<UserDetails> findByLogin(String username);

    UserDto auth(User user);

    int getCountOfAdv(Long userId);

    boolean changeBlockStatus(Long userId);

    boolean changeRoles(Long userId, ArrayList<String> roles);
}
