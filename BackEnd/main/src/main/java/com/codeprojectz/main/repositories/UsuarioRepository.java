package com.codeprojectz.main.repositories;

import com.codeprojectz.main.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Usuario findByEmailAndSenha(String email, String senha);
    Usuario findByUserID(Integer userID);

    @Query(value = "SELECT userid, data_nascimento, email, nome, sobrenome FROM usuario WHERE userid = :userID", nativeQuery = true)
    Usuario findUserProfile(@Param("userID") Integer userID);

}
