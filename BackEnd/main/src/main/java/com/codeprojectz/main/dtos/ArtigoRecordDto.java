package com.codeprojectz.main.dtos;

import com.codeprojectz.main.models.ConteudoModel;
import com.codeprojectz.main.models.UsuarioModel;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record ArtigoRecordDto(
        @NotBlank String titulo,
        @NotNull Date dataPostagem,
        @NotBlank String descricao,
        @NotNull UsuarioModel criador,
        @NotNull ConteudoModel conteudo,
        @Min(value = 1, message = "O tipo deve ser 1 para artigo ou 2 para vídeo")
        @Max(value = 2, message = "O tipo deve ser 1 para artigo ou 2 para vídeo")
        int tipo
) {
}