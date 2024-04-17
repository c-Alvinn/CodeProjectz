package com.codeprojectz.main.repositories;

import com.codeprojectz.main.models.Conteudo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConteudoRepository extends JpaRepository<Conteudo, Integer> {
}
