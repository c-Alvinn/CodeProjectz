package com.codeprojectz.main.controllers;

import com.codeprojectz.main.repositories.ArtigoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ArtigoController {

    @Autowired
    ArtigoRepository artigoRepository;
}
