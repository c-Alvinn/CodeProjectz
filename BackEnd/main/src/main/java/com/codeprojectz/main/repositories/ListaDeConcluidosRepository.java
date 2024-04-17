package com.codeprojectz.main.repositories;

import com.codeprojectz.main.models.ListaDeConcluidos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListaDeConcluidosRepository extends JpaRepository<ListaDeConcluidos, Integer>{
}
