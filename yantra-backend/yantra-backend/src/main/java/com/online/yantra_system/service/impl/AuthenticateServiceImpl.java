//package com.online.yantra_system.service.impl;
//
//import com.online.yantra_system.dto.request.AuthenticateRequest;
//import com.online.yantra_system.dto.response.AuthenticateResponse;
//import com.online.yantra_system.repo.UserRepo;
//import com.online.yantra_system.security.JwtService;
//import com.online.yantra_system.service.AuthenticateService;
//import jakarta.persistence.EntityNotFoundException;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class AuthenticateServiceImpl implements AuthenticateService {
//
//    private final UserRepo userRepo;
//    private final AuthenticationManager authenticationManager;
//    private final JwtService jwtService;
//
//
//    @Override
//    public AuthenticateResponse authenticate(AuthenticateRequest authenticateRequest) {
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        authenticateRequest.getEmail(), authenticateRequest.getPassword()
//                )
//        );
//
//        UserDetails userDetails = userRepo.getUserByEmail(authenticateRequest.getEmail())
//                .orElseThrow(() -> new EntityNotFoundException("User not found."));
//        String jwtToken = jwtService.generateToken(userDetails);
//        return AuthenticateResponse.builder().token(jwtToken).build();
//    }
//}
