package com.codeprojectz.main.dtos;

import jakarta.validation.constraints.NotBlank;

public record ConteudoRecordDto(
        @NotBlank String nomeArquivo,
        @NotBlank
        byte[] conteudo,
        @NotBlank
        String tipoArquivo
) {
}
