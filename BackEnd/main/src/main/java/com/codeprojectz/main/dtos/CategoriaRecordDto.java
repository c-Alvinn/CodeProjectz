package com.codeprojectz.main.dtos;

import com.codeprojectz.main.models.Artigo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CategoriaRecordDto(
        @NotBlank String nome,
        @NotNull Artigo artigo
) {
}
