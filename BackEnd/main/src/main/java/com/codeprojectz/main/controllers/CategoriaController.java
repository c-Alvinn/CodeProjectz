package com.codeprojectz.main.controllers;

import com.codeprojectz.main.dtos.CategoriaRecordDto;
import com.codeprojectz.main.models.Categoria;
import com.codeprojectz.main.repositories.CategoriaRepository;

import jakarta.validation.Valid;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.Optional;
import java.util.List;

//import org.hibernate.mapping.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/listar")
    public ResponseEntity<List<Categoria>> getAllCategorias(){
        List<Categoria> categoriaList = categoriaRepository.findAll();
        if (!categoriaList.isEmpty()) {
            for(Categoria categoria : categoriaList) {
                int id = categoria.getCategoriaID();
                categoria.add(linkTo(methodOn(CategoriaController.class).getOneCategoria(id)).withSelfRel());
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(categoriaList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getOneCategoria(@PathVariable(value = "id") Integer id) {
        Optional<Categoria> categoria0 = categoriaRepository.findById(id);
        if (categoria0.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categorias not found.");
        }
        categoria0.get().add(linkTo(methodOn(CategoriaController.class).getAllCategorias()).withRel("Categoriaa List"));
        return ResponseEntity.status(HttpStatus.OK).body(categoria0.get());
    }
}
