package com.codeprojectz.main.dtos;

import jakarta.validation.constraints.NotBlank;

public record ArtigoRecordDto(
        @NotBlank String titulo,
        @NotBlank String descricao,
        @NotBlank String categoriaNome,
        @NotBlank String criadorEmail
) {
}
