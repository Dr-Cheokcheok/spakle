package com.spakle.spakleclone20221104.security;

import com.spakle.spakleclone20221104.service.auth.PrincipalDetails;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthSuccessHandler implements AuthenticationSuccessHandler {
    private static Logger logger = LogManager.getLogger(AuthSuccessHandler.class);
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        for(GrantedAuthority authority : principalDetails.getAuthorities()) {
            if(authority.getAuthority().equals("ROLE_ADMIN")) {
                response.sendRedirect("/admin/index");
                return;
            }
        }

        response.sendRedirect("/index");
    }

}