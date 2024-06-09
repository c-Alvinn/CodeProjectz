package com.codeprojectz.main.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record UsuarioUpdateDto(
        @NotBlank String nome,
        @NotBlank String sobrenome,
        @NotNull Date dataNascimento,
        @NotBlank @Email String email
) {
}
