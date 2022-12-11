package com.bsuir.kufar.util;

import java.security.NoSuchAlgorithmException;

public interface PasswordEncoder {
    String encode(String value);
}
