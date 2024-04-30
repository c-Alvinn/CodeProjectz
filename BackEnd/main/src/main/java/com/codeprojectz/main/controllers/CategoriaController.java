package com.codeprojectz.main.controllers;

import com.codeprojectz.main.dtos.CategoriaRecordDto;
import com.codeprojectz.main.models.Categoria;
import com.codeprojectz.main.repositories.CategoriaRepository;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping
    public ResponseEntity<List<Categoria>> getAll() {
        List<Categoria> lista = categoriaRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(lista);
    }

    @GetMapping("/{nome}")
    public ResponseEntity<Categoria> findByNome(@PathVariable(value = "nome") String nome){
        var categoria = categoriaRepository.findByNome(nome);
        if (categoria == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(categoria);
    }

    @DeleteMapping("/{nome}")
    public ResponseEntity<Categoria> deleteCategoria(@PathVariable(value = "nome") String nome){
        var categoria = categoriaRepository.findByNome(nome);
        if (categoria == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        categoriaRepository.delete(categoria);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
