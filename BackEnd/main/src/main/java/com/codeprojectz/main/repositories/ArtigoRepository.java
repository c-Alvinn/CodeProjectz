package com.codeprojectz.main.repositories;

import com.codeprojectz.main.models.Artigo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtigoRepository extends JpaRepository<Artigo, Integer> {
    List<Artigo> findByCategoriaCategoriaID(Integer categoriaID);
    List<Artigo> findByCategoriaNome(String nome);
}
