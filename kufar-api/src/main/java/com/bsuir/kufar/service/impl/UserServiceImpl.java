package com.bsuir.kufar.service.impl;

import com.bsuir.kufar.entity.User;
import com.bsuir.kufar.repository.ProductRepository;
import com.bsuir.kufar.repository.UserRepository;
import com.bsuir.kufar.service.GenericService;
import com.bsuir.kufar.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends GenericService<User> implements UserService {
    public UserServiceImpl(UserRepository userRepository) {
        super(userRepository);
    }
}
