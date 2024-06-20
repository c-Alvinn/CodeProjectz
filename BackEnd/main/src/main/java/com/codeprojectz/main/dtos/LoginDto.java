package com.codeprojectz.main.dtos;

import jakarta.validation.constraints.NotBlank;

public record LoginDto(
    
    @NotBlank
    String email,
    
    @NotBlank
    String senha
    
    ) {

}
