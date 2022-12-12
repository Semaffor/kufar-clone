package com.bsuir.api.controller;

import com.bsuir.api.dto.UserDto;
import com.bsuir.api.factory.DtoFactorySupport;
import com.bsuir.kufar.entity.User;
import com.bsuir.kufar.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final static String CAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s";

    private final UserService userService;
    private final DtoFactorySupport<User, UserDto> userDtoFactory;

    @Value("${recaptcha.secret}")
    private String secretKey;

    @GetMapping("/{id}")
    private UserDto getUser(@PathVariable Long id) {
        return userDtoFactory.createDto(userService.findById(id));
    }

    @GetMapping("/adv/{id}")
    private int getUserAdvCount(@PathVariable Long id) {
        return userService.getCountOfAdv(id);
    }

    @PutMapping("/addFavourite")
    private boolean getUser(@RequestBody Map<String, Object> params) {
        return userService.changeIsFavouriteProduct(
                Long.valueOf(String.valueOf(params.get("userId"))),
                Long.valueOf(String.valueOf(params.get("productId")))
        );
    }

    @PostMapping
    public String addUser(@RequestBody Map<String, Object> params) {
        User user = new User();
        user.setPassword(String.valueOf(params.get("password")).toCharArray());
        user.setLogin(String.valueOf(params.get("login")));
        user.setEmail(String.valueOf(params.get("email")));
       String captchaResponse = String.valueOf(params.get("captchaResponse"));
        //        String url = String.format(CAPTCHA_URL, secretKey, captchaResponse);
//        CaptchaDto responseFromCaptcha = restTemplate.postForObject(url, Collections.emptyList(),
//                CaptchaDto.class);
//
//        if (!responseFromCaptcha.isSuccess()) {
//            return "capthca";
//        }
        System.out.println(secretKey);

        if (captchaResponse.length() < 5) {
            return "captcha";
        }

        boolean addedSuccessful = userService.regNewUser(user);
        return addedSuccessful ? "true" : "exists";
    }

    @GetMapping
    public boolean activateCode(@RequestParam("code") String uuid) {
        return userService.activateAccountByCode(uuid);
    }

    @GetMapping("/all")
    public List<UserDto> getAll() {
        return userDtoFactory.createDtoList(userService.findAll());
    }

    @PostMapping("/recovery")
    public boolean passwordRecovery(@RequestBody Map<String, Object> params) {
        return userService.recoverPasswordByEmail(String.valueOf(params.get("email")));
    }

    @PostMapping("/auth")
    public UserDto auth(@RequestBody User user) {
        return userService.auth(user);
    }

    @PostMapping("/block")
    public boolean changeBlock(@RequestBody Map<String, Long> params) {
        return userService.changeBlockStatus(params.get("userId"));
    }

    @PutMapping("/roles")
    @SuppressWarnings("unchecked")
    public boolean changeRoles(@RequestBody Map<String, Object> params) {
        return userService.changeRoles(
                Long.valueOf(String.valueOf(params.get("userId"))),
                (ArrayList<String>) params.get("roles"));
    }
}
