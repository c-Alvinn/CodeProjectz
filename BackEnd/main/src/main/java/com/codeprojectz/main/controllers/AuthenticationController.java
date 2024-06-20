package com.codeprojectz.main.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codeprojectz.main.dtos.LoginDto;
import com.codeprojectz.main.dtos.TokenJWTDataDto;
import com.codeprojectz.main.models.Usuario;
import com.codeprojectz.main.services.TokenService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/login")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody @Valid LoginDto dados){
        var token = new UsernamePasswordAuthenticationToken(dados.email(), dados.senha());
        var authenticator = manager.authenticate(token);

        var tokenJWT = tokenService.generateToken((Usuario) authenticator.getPrincipal());

        return ResponseEntity.ok(new TokenJWTDataDto(tokenJWT, dados.email()));
    }
}
