package com.bupjangsa.security.service;

import com.bupjangsa.security.dto.AppUserDetails;
import com.bupjangsa.security.dto.JwtDto;
import com.bupjangsa.exception.AuthorizeException;
import com.bupjangsa.type.AuthorityType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Key;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

import static com.bupjangsa.constant.MessageConst.UNAUTHORIZED_TOKEN;

@Slf4j
@Service
public class BhaSecurityService {
    private static final String ACCESS_HEADER = "Authorization";
    private static final String BEARER = "Bearer ";
    private final Key secretKey;

    /**
     * JWT의 Subject는 사용자의 이름, Claim에 id 세팅 -> JWT의 헤더에 들어오는 값 :
     * 'Authorization(Key) = Bearer {토큰} (Value)' 형식
     */
    public BhaSecurityService(@Value("${secret.key.jwt}") String tokenKey) {
        byte[] keyBites = Decoders.BASE64.decode(tokenKey);
        this.secretKey = Keys.hmacShaKeyFor(keyBites);
    }

    @Transactional
    public JwtDto.Tokens getTokens(Long userId, String accountId, AuthorityType authority){

        String accessToken = this.createAccessToken(userId, accountId, authority);
        String refreshToken = this.createRefreshToken(accountId, authority);

        return JwtDto.Tokens.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

    }

    public String createAccessToken(Long userId, String accountId, AuthorityType authority) {

        LocalDateTime now = LocalDateTime.now();
        Date accessTokenExpiresIn = Timestamp.valueOf(now.plusDays(1));

        Claims claims = Jwts.claims()
                .setSubject(String.valueOf(userId));
        claims.put("accountId", accountId);
        claims.put("authority", authority);

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(accessTokenExpiresIn)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String createRefreshToken(String accountId, AuthorityType authority){
        LocalDateTime now = LocalDateTime.now();
        Date accessTokenExpiresIn = Timestamp.valueOf(now.plusDays(14));

        Claims claims = Jwts.claims();
        claims.put("accountId", accountId);
        claims.put("userType", authority);

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(accessTokenExpiresIn)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * 헤더에서 AccessToken 추출 토큰 형식 : Bearer XXX에서 Bearer를 제외하고 순수 토큰만 가져오기 위해서 헤더를 가져온 후 "Bearer"를
     * 삭제(""로 replace)
     */
    public Optional<String> extractAccessToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(ACCESS_HEADER))
                .filter(accessToken -> accessToken.startsWith(BEARER))
                .map(accessToken -> accessToken.replace(BEARER, ""));
    }

    public Optional<UserDetails> getUserDetails(String accessToken) {
        try {

            Claims body = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(accessToken)
                    .getBody();

            Long userId = Long.valueOf(String.valueOf(body.get("sub")));
            String accountId = String.valueOf(body.get("userId"));


            return Optional.ofNullable(AppUserDetails.valueOf(userId, accountId));
        } catch (Exception e) {
            log.error(UNAUTHORIZED_TOKEN.getMessage());
            return Optional.empty();
        }
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            log.error(UNAUTHORIZED_TOKEN.getMessage()+" {}", e.getMessage());
            throw new AuthorizeException(UNAUTHORIZED_TOKEN.getMessage());
        }
    }


}
