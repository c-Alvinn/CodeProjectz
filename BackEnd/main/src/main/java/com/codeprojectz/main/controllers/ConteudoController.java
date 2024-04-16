package com.codeprojectz.main.controllers;

import com.codeprojectz.main.repositories.ConteudoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/conteudo")
@RestController
public class ConteudoController {

    @Autowired
    ConteudoRepository conteudoRepository;
}
