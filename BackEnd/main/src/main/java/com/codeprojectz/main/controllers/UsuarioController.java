package com.codeprojectz.main.controllers;

import com.codeprojectz.main.dtos.UsuarioRecordDto;
import com.codeprojectz.main.models.UsuarioModel;
import com.codeprojectz.main.repositories.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/usuario")
@RestController
public class UsuarioController {

    @Autowired
    UsuarioRepository usuarioRepository;

    @PostMapping("/criar")
    public ResponseEntity<UsuarioModel> saveProduct(@RequestBody @Valid UsuarioRecordDto usuarioRecordDto) {
        var usuarioModel = new UsuarioModel();

        if (usuarioModel.getEmail().contains("@estudante.iftm.edu.br")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        BeanUtils.copyProperties(usuarioRecordDto, usuarioModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioRepository.save(usuarioModel));
    }


}
