package com.bupjangsa.config;

import com.bupjangsa.security.dto.AuthErrorResponse;
import com.bupjangsa.security.filter.JwtAuthenticationFilter;
import com.bupjangsa.security.service.BhaSecurityService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.IOException;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class BhaSecurityConfig {

    private final BhaSecurityService bhaSecurityService;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(bhaSecurityService);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        //https://non-stop.tistory.com/667
        //https://velog.io/@park2348190/Spring-Security%EC%9D%98-Unauthorized-Forbidden-%EC%B2%98%EB%A6%AC
        http
                .exceptionHandling(e -> e
                        .authenticationEntryPoint(unauthorizedEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler)
                )
                .httpBasic(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
//                .cors(corsCustomizer -> corsCustomizer.configurationSource(corsConfigurationSource()))
                .headers(header -> header.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
                .sessionManagement(
                        config -> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(
                        registry ->
                                registry
                                        .requestMatchers(
                                                AntPathRequestMatcher.antMatcher("/"),
                                                AntPathRequestMatcher.antMatcher("/docs/**"),
                                                AntPathRequestMatcher.antMatcher("/swagger-ui/**"),
                                                AntPathRequestMatcher.antMatcher("/swagger-resources/**"),
                                                AntPathRequestMatcher.antMatcher("/h2-console/**"),

                                                AntPathRequestMatcher.antMatcher(HttpMethod.POST, "/api/v1/user"),
                                                AntPathRequestMatcher.antMatcher(HttpMethod.POST, "/api/v1/user/login"),

                                                AntPathRequestMatcher.antMatcher(HttpMethod.GET, "/api/v1/post/**"),
                                                AntPathRequestMatcher.antMatcher(HttpMethod.GET, "/api/v1/calendar/**"),
                                                AntPathRequestMatcher.antMatcher(HttpMethod.GET, "/files/**")

                                        ).permitAll()
                                        .anyRequest()
                                        .authenticated()
                )
        ;
        http.addFilterAfter(jwtAuthenticationFilter(),
                UsernamePasswordAuthenticationFilter.class);

        return http.build();

    }

//    //TODO 도메인으로 변경
//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("*"));
//        configuration.setAllowedMethods(List.of("*"));
//        configuration.setAllowedHeaders(List.of("*"));
//        configuration.setExposedHeaders(List.of("Authorization", "Refresh-Token"));
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }

    //403 Forbidden
    private final AccessDeniedHandler accessDeniedHandler =
            (request, response, authException) -> {
                AuthErrorResponse<Void> errorResponse = AuthErrorResponse.forbidden();
                sendResponse(response, errorResponse);
            };

    //401 Unauthorized
    private final AuthenticationEntryPoint unauthorizedEntryPoint =
            (request, response, authException) -> {
                AuthErrorResponse<Void> errorResponse = AuthErrorResponse.unauthorized();
                sendResponse(response, errorResponse);
            };


    private void sendResponse(HttpServletResponse response, AuthErrorResponse<Void> errorResponse) throws IOException {
        String jsonErrorResponse = new ObjectMapper().writeValueAsString(errorResponse);
        response.setStatus(errorResponse.getResultCode());
        response.setCharacterEncoding("utf-8");
        response.setContentType(MediaType.APPLICATION_JSON_VALUE); // application/json
        response.getWriter().write(jsonErrorResponse);
    }
}
