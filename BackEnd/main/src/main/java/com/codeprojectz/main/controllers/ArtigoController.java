package com.codeprojectz.main.controllers;

import com.codeprojectz.main.dtos.ArtigoRecordDto;
import com.codeprojectz.main.models.Artigo;
import com.codeprojectz.main.repositories.ArtigoRepository;
import com.codeprojectz.main.repositories.CategoriaRepository;
import com.codeprojectz.main.repositories.ConteudoRepository;
import com.codeprojectz.main.repositories.UsuarioRepository;

import jakarta.validation.Valid;

import java.util.List;

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

@RequestMapping("/artigo")
@RestController
public class ArtigoController {

    @Autowired
    ArtigoRepository artigoRepository;
    @Autowired
    CategoriaRepository categoriaRepository;
    @Autowired
    ConteudoRepository conteudoRepository;
    @Autowired
    UsuarioRepository usuarioRepository;

    @PostMapping
    public ResponseEntity<Artigo> addArtigo(@RequestBody @Valid ArtigoRecordDto artigoRecordDto) {
        var artigo = new Artigo();
        BeanUtils.copyProperties(artigoRecordDto, artigo);
        artigo.setCategoria(categoriaRepository.findByCategoriaID(artigoRecordDto.categoriaID()));
        artigo.setCriador(usuarioRepository.findByUserID(artigoRecordDto.criadorID()));

        List<Integer> ids = conteudoRepository.findLastTwoIds();
        artigo.setImagem(conteudoRepository.findByConteudoID(ids.getLast()));
        artigo.setConteudo(conteudoRepository.findByConteudoID(ids.getFirst()));
        
        return ResponseEntity.status(HttpStatus.CREATED).body(artigoRepository.save(artigo));
    }

    @GetMapping
    public ResponseEntity<List<Artigo>> listAll(){
        List<Artigo> lista = artigoRepository.findAll();

        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(lista);
    }

    @GetMapping("/id/{categoriaID}")
    public ResponseEntity<List<Artigo>> findByCategoria(@PathVariable(value = "categoriaID") int categoriaID){
        List<Artigo> lista = artigoRepository.findByCategoriaCategoriaID(categoriaID);
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(lista);
    }

    @GetMapping("/{nome}")
    public ResponseEntity<List<Artigo>> findByNome(@PathVariable(value = "nome") String nome){
        List<Artigo> lista = artigoRepository.findByCategoriaNomeLike(nome);
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(lista);
    }
}
