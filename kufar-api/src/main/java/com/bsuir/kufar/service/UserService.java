package com.bsuir.kufar.service;

import com.bsuir.kufar.entity.User;

public interface UserService  extends CrudOperations<User>{
    boolean changeIsFavouriteProduct(Long userId, Long productId);

    boolean regNewUser(User user);

    boolean activateAccountByCode(String uuid);

    boolean recoverPasswordByEmail(String email);
}
