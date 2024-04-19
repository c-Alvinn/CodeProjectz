package com.codeprojectz.main.dtos;

import jakarta.validation.constraints.NotBlank;

public record CategoriaRecordDto(
        @NotBlank String nome
) {
}
