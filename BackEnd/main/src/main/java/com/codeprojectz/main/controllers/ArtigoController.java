package com.codeprojectz.main.controllers;

import com.codeprojectz.main.dtos.ArtigoRecordDto;
import com.codeprojectz.main.models.Artigo;
import com.codeprojectz.main.repositories.ArtigoRepository;

import jakarta.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/artigo")
@RestController
public class ArtigoController {

    @Autowired
    ArtigoRepository artigoRepository;

    @PostMapping
    public ResponseEntity<Artigo> addArtigo(@RequestBody @Valid ArtigoRecordDto artigoRecordDto) {
        var artigo = new Artigo();
        BeanUtils.copyProperties(artigoRecordDto, artigo);
        return ResponseEntity.status(HttpStatus.CREATED).body(artigoRepository.save(artigo));
    }
}
