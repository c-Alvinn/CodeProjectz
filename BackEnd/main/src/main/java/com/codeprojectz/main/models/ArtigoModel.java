package com.codeprojectz.main.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.hateoas.RepresentationModel;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "artigo")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ArtigoModel extends RepresentationModel<ArtigoModel> implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int artigoID;
    private String titulo;
    private Date dataPostagem;
    private String descricao;
    private UsuarioModel criador;
    private ConteudoModel conteudo;
    private int tipo;
}
