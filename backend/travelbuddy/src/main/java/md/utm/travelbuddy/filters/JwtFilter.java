package md.utm.travelbuddy.filters;

import org.springframework.context.annotation.Bean;
import org.springframework.security.web.SecurityFilterChain;

import java.net.http.HttpRequest;

public class JwtFilter {

    @Bean
    SecurityFilterChain jwtFilterChain(HttpRequest http) {
        return (SecurityFilterChain) http;
    }

}
