package com.bsuir.kufar.config;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpHeaders;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContext;
//import org.springframework.security.core.context.SecurityContextImpl;
//import org.springframework.security.web.server.context.ServerSecurityContextRepository;
//import org.springframework.stereotype.Component;
//import org.springframework.web.server.ServerWebExchange;
//import reactor.core.publisher.Mono;
//
//@Component
//@RequiredArgsConstructor
public class SecurityContextRepository{}
//public class SecurityContextRepository implements ServerSecurityContextRepository {
//
//    private final AuthenticationManager authenticationManager;
//
//    @Override
//    public Mono<Void> save(ServerWebExchange exchange, SecurityContext context) {
//        return null;
//    }
//
//    @Override
//    public Mono<SecurityContext> load(ServerWebExchange exchange) {
//        String header = exchange.getRequest()
//                .getHeaders()
//                .getFirst(HttpHeaders.AUTHORIZATION);
//        if (header != null && header.startsWith("Bearer")) {
//            String authToken = header.substring(7);
//            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(authToken, authToken);
//            return authenticationManager
//                    .authenticate(auth)
//                    .map(SecurityContextImpl::new);
//        }
//        return Mono.empty();
//    }
//}
