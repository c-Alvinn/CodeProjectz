package com.codeprojectz.main.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.hateoas.RepresentationModel;

import java.io.Serializable;

@Entity
@Table(name = "listaDeConcluidos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ListaDeConcluidos extends RepresentationModel<ListaDeConcluidos> implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int listaDeConcluidosID;
    private Artigo idArtigo;
    private Usuario idUsuario;
}
