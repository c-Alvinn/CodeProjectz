package com.codeprojectz.main.controllers;

import com.codeprojectz.main.dtos.CategoriaRecordDto;
import com.codeprojectz.main.models.Categoria;
import com.codeprojectz.main.repositories.CategoriaRepository;

import jakarta.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/categoria")
@RestController
public class CategoriaController {

    @Autowired
    CategoriaRepository categoriaRepository;

    @PostMapping
    public ResponseEntity<Categoria> addCategory(@RequestBody @Valid CategoriaRecordDto categoriaRecordDto){
        var categoria = new Categoria();
        BeanUtils.copyProperties(categoriaRecordDto, categoria);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaRepository.save(categoria));
    }
}
