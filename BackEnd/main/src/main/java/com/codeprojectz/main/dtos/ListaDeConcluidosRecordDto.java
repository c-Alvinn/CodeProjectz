package com.codeprojectz.main.dtos;

import jakarta.validation.constraints.NotNull;

public record ListaDeConcluidosRecordDto(
        @NotNull
        int idArtigo,
        @NotNull
        int idUsuario
) {
}
