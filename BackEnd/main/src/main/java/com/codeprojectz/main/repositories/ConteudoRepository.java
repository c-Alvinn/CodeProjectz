package com.codeprojectz.main.repositories;

import com.codeprojectz.main.models.ConteudoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConteudoRepository extends JpaRepository<ConteudoModel, Integer> {
}
