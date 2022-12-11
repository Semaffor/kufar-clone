package com.bsuir.kufar.config;
//
//import com.bsuir.kufar.entity.enums.Role;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
//import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
//import org.springframework.security.config.web.server.ServerHttpSecurity;
//import org.springframework.security.crypto.password.NoOpPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.server.SecurityWebFilterChain;
//
//@Configuration
//@EnableWebFluxSecurity
//@EnableReactiveMethodSecurity
//@RequiredArgsConstructor
public class WebSecurityConfig {
//
//    private final SecurityContextRepository securityContextRepository;
//    private final AuthenticationManager authenticationManager;
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return NoOpPasswordEncoder.getInstance();
//    }
//
//    @Bean
//    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity httpSecurity) {
//        return httpSecurity.
//                csrf().disable()
//                .formLogin().disable()
//                .httpBasic().disable()
//                .authenticationManager(authenticationManager)
//                .securityContextRepository(securityContextRepository)
//                .authorizeExchange()
//                .pathMatchers("/product/**", "/auth", "/").permitAll()
//                .pathMatchers("/v1").hasRole(Role.USER.toString())
//                .anyExchange().authenticated()
//                .and()
//                .build();
//    }
}
