package com.codeprojectz.main.models;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.hateoas.RepresentationModel;

import java.io.Serializable;

@Entity
@Table(name = "conteudo")
@EqualsAndHashCode(callSuper=true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Conteudo extends RepresentationModel<Conteudo> implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int conteudoID;
    private String nomeArquivo;
    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] conteudo;
    private String tipoArquivo;
}
