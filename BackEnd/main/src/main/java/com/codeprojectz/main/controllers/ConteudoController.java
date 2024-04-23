package com.codeprojectz.main.controllers;

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

    @PostMapping
    public ResponseEntity<?> uploadFile(@RequestParam("conteudo") MultipartFile file) throws IOException {
        String uploadFile = conteudoService.uploadFile(file);

        return ResponseEntity.status(HttpStatus.OK).body(uploadFile);
    }

    @GetMapping("/{filename}")
    public ResponseEntity<?> downloadFile(@PathVariable String filename){
        byte[] fileInbytes = conteudoService.downloadFile(filename);

        MediaType mediaType = MediaTypeFactory.getMediaType(filename)
                .orElse(MediaType.APPLICATION_OCTET_STREAM);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(mediaType).body(fileInbytes);
    }
}
