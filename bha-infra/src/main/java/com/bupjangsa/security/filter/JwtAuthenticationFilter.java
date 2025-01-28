package com.bupjangsa.security.filter;

import com.bupjangsa.exception.AuthorizeException;
import com.bupjangsa.constant.MessageConst;
import com.bupjangsa.security.service.BhaSecurityService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final BhaSecurityService bhaSecurityService;
    private final GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) {
        try{
            log.debug("checkAccessTokenAndAuthentication() 호출");

            Optional<String> jwtToken = bhaSecurityService.extractAccessToken(request);
            if(jwtToken.isPresent()){
                jwtToken.filter(bhaSecurityService::isTokenValid)
                        .flatMap(bhaSecurityService::getUserDetails)
                        .ifPresent(this::saveAuthentication);
            }

            filterChain.doFilter(request, response);
        }catch (Exception e){
            throw new AuthorizeException(MessageConst.UNAUTHORIZED_TOKEN);
        }
    }

    public void saveAuthentication(UserDetails userDetailsUser) {

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(userDetailsUser, null,
                        authoritiesMapper.mapAuthorities(userDetailsUser.getAuthorities()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}
