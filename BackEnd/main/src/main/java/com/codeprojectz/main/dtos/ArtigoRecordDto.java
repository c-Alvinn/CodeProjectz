package com.codeprojectz.main.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record ArtigoRecordDto(
        @NotBlank String titulo,
        @NotNull Date dataPostagem,
        @NotBlank String descricao,
        @NotNull int categoriaId,
        @NotNull int criadorId,
        @NotNull int conteudoId
) {
}
