package com.codeprojectz.main.dtos;

import com.codeprojectz.main.models.Usuario;

public record UsuarioResponseDto(

    int userID,
    String email

) {

    public UsuarioResponseDto(Usuario usuario){
        
        this(usuario.getUserID(), usuario.getEmail());
    }
}
