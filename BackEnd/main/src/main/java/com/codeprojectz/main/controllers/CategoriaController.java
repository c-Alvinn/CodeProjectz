package com.codeprojectz.main.controllers;

import com.codeprojectz.main.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoriaController {

    @Autowired
    CategoriaRepository categoriaRepository;
}
