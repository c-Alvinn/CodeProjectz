package com.codeprojectz.main.repositories;

import com.codeprojectz.main.models.Conteudo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConteudoRepository extends JpaRepository<Conteudo, Integer> {

    Optional<Conteudo> findByNomeArquivo(String nomeArquivo);

    Conteudo findByConteudoID(Integer conteudoID);

    @Query(value = "SELECT conteudoID FROM conteudo ORDER BY conteudoID DESC LIMIT 2", nativeQuery = true)
    List<Integer> findLastTwoIds();
}
