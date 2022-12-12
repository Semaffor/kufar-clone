package com.bsuir.kufar.entity.enums;

public enum Role {
    USER("Пользователь"), ADMIN("Администратор");

    private final String ruValue;

    Role(String ruValue) {
        this.ruValue = ruValue;
    }

    public String getRuValue() {
        return ruValue;
    }

    public static Role valueRuOf(String value) {
        for(Role role: Role.values()) {
            if (role.getRuValue().equals(value)) {
                return role;
            }
        }
        return USER;
    }
}
