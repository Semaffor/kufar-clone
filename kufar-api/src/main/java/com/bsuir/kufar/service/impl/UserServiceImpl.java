package com.bsuir.kufar.service.impl;

import com.bsuir.api.dto.UserDto;
import com.bsuir.api.exception.NotFoundException;
import com.bsuir.api.factory.UserDtoFactory;
import com.bsuir.kufar.entity.FavouriteProduct;
import com.bsuir.kufar.entity.Product;
import com.bsuir.kufar.entity.User;
import com.bsuir.kufar.entity.UserCode;
import com.bsuir.kufar.entity.enums.Role;
import com.bsuir.kufar.entity.enums.StatusCode;
import com.bsuir.kufar.repository.*;
import com.bsuir.kufar.service.GenericService;
import com.bsuir.kufar.service.MailSender;
import com.bsuir.kufar.service.UserService;
import com.bsuir.kufar.util.PasswordEncoder;
import jakarta.transaction.Transactional;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Service
public class UserServiceImpl extends GenericService<User> implements UserService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final FavouriteProductRepository favouriteProductRepository;
    private final UserCodeRepository userCodeRepository;
    private final MailSender mailSender;
    private final PasswordEncoder passwordEncoder;
    private final UserDtoFactory userDtoFactory;


    @Value("${address.local.web}")
    private String hostAddressWeb;

    public UserServiceImpl(@NonNull BaseRepository<User> genericRepository, UserRepository userRepository,
                           ProductRepository productRepository, FavouriteProductRepository favouriteProductRepository,
                           UserCodeRepository userCodeRepository, MailSender mailSender,
                           PasswordEncoder passwordEncoder,
                           UserDtoFactory userDtoFactory) {
        super(genericRepository);
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.favouriteProductRepository = favouriteProductRepository;
        this.userCodeRepository = userCodeRepository;
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
        this.userDtoFactory = userDtoFactory;
    }

    @Override
    @Transactional
    public boolean changeIsFavouriteProduct(Long userId, Long productId) {
        User user = genericRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(
                        String.format("Пользователь с id = %d не найден", userId)));

        Product product = productRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(
                        String.format("Товар с id = %d не найден", productId)));

        FavouriteProduct fp = favouriteProductRepository.findByUserAndProduct(user, product);

        if (fp == null) {
        fp = FavouriteProduct.builder()
                .user(user)
                .product(product)
                .addedDate(new Date())
                .build();
        } else {
            fp.setDeleted(!fp.isDeleted());
        }

        favouriteProductRepository.save(fp);
        return true;
    }

    @Override
    public boolean regNewUser(User user) {
        User byLogin = userRepository.findByLogin(user.getLogin());
        if (byLogin == null) {
            user.setPassword(passwordEncoder.encode(new String(user.getPassword())).toCharArray());
            user.setRoles(Set.of(Role.USER));
            user.setRegistrationDate(new Date());
            User savedUser = genericRepository.save(user);

            String uuid = UUID.randomUUID().toString();
            mailSender.send(user.getEmail(), "Activation code",
                    String.format("Добрый день!\n " +
                            "Код для активации аккаунта: %s/activate/user/%s", hostAddressWeb, uuid));
            userCodeRepository.save(new UserCode(uuid, savedUser));

            return true;
        }
        return false;
    }

    @Override
    public boolean activateAccountByCode(String uuid) {
        UserCode byCode = userCodeRepository.findByCode(uuid);
        if (byCode != null) {
            userCodeRepository.delete(byCode);

            User user = byCode.getUser();
            user.setActivated(true);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public boolean recoverPasswordByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return false;
        }
        String newPassword = UUID.randomUUID().toString();
        String encodedPassword = passwordEncoder.encode(newPassword);
        mailSender.send(user.getEmail(), "Восстановление пароля",
                String.format("Новый пароль: %s", newPassword));

        user.setPassword(encodedPassword.toCharArray());
        userRepository.save(user);
        return true;
    }

//    @Override
//    public Mono<UserDetails> findByLogin(String username) {
//
//        return userRepository.findMonoByLogin(username)
//                .cast(UserDetails.class);
//    }

    @Override
    public UserDto auth(User user) {
        String encodedPassword = passwordEncoder.encode(new String(user.getPassword()));
        User foundUser = userRepository.findByLoginAndPassword(user.getLogin(), encodedPassword.toCharArray());
        if (foundUser == null) {
            UserDto dto = UserDto.builder()
                    .statusCode(StatusCode.INCORRECT_LOGIN_OR_PASSWORD)
                    .build();
            return dto;
        }
        return userDtoFactory.createDto(foundUser);
    }
}
