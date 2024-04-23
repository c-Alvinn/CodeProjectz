package com.codeprojectz.main.services;

import com.codeprojectz.main.models.Conteudo;
import com.codeprojectz.main.repositories.ConteudoRepository;
import com.codeprojectz.main.utility.FileUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ConteudoService {

    @Autowired
    ConteudoRepository conteudoRepository;

    public String uploadFile(MultipartFile file) throws IOException {
        Conteudo result = conteudoRepository.save(Conteudo.builder()
                .nomeArquivo(file.getOriginalFilename())
                .tipoArquivo(file.getContentType())
                .conteudo(FileUtils.compressFile(file.getBytes())).build());

        if(result != null){
            return "Saved File in DB with name: "+file.getOriginalFilename();
        }
        return "File not saved";
    }


    public byte[] downloadFile(String fileName){
        Optional<Conteudo> fileFromDb = conteudoRepository.findByNomeArquivo(fileName);
        byte[] fileInbytes = FileUtils.decompressFile(fileFromDb.get().getConteudo());
        return fileInbytes;
    }

}
