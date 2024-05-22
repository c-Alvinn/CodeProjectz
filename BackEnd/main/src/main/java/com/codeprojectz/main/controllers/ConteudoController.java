package com.codeprojectz.main.controllers;

import com.codeprojectz.main.models.Conteudo;
import com.codeprojectz.main.repositories.ConteudoRepository;
import com.codeprojectz.main.services.ConteudoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequestMapping("/conteudo")
@RestController
public class ConteudoController {

    @Autowired
    ConteudoService conteudoService;

    @Autowired
    ConteudoRepository conteudoRepository;

    @PostMapping
    public ResponseEntity<?> uploadFile(@RequestParam("conteudo") MultipartFile file) throws IOException {
        String uploadFile = conteudoService.uploadFile(file);

        return ResponseEntity.status(HttpStatus.OK).body(uploadFile);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getFileById(@PathVariable(value="id") Integer id){
        Conteudo conteudo = conteudoRepository.findByConteudoID(id);

        if(conteudo == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        conteudo.setConteudo(conteudoService.downloadFileById(id));

        MediaType mediaType = MediaTypeFactory.getMediaType(conteudo.getNomeArquivo()).orElse(MediaType.APPLICATION_OCTET_STREAM);

        return ResponseEntity.status(HttpStatus.OK).contentType(mediaType).body(conteudo.getConteudo());
    }

    @GetMapping("/{filename}")
    public ResponseEntity<?> downloadFile(@PathVariable String filename){
        byte[] fileInbytes = conteudoService.downloadFile(filename);

        MediaType mediaType = MediaTypeFactory.getMediaType(filename)
                .orElse(MediaType.APPLICATION_OCTET_STREAM);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(mediaType).body(fileInbytes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteConteudo(@PathVariable(value="id") Integer id) {
        var conteudo = conteudoRepository.getReferenceById(id);
        if (conteudo == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Conteudo problem");
        }
        conteudoRepository.delete(conteudo);
        return ResponseEntity.status(HttpStatus.OK).body("Conteudo deleted successfully.");
    }
}
