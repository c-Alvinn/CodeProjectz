package com.codeprojectz.main.repositories;

import com.codeprojectz.main.models.Conteudo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConteudoRepository extends JpaRepository<Conteudo, Integer> {

    Optional<Conteudo> findByNomeArquivo(String nomeArquivo);
}
