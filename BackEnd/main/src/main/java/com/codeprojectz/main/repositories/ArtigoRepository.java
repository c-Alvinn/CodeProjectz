package com.codeprojectz.main.repositories;

import com.codeprojectz.main.models.ArtigoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtigoRepository extends JpaRepository<ArtigoModel, Integer> {
}
