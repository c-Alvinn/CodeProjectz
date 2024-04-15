package com.codeprojectz.main.models;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.hateoas.RepresentationModel;

import java.io.Serializable;

@Entity
@Table(name = "conteudo")
@Data
public class ConteudoModel extends RepresentationModel<ConteudoModel> implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int conteudoID;
    private String nomeArquivo;
    @Lob
    private byte[] conteudo;
    private String tipoArquivo;
}
