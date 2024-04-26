package com.codeprojectz.main.controllers;

import com.codeprojectz.main.dtos.UsuarioRecordDto;
import com.codeprojectz.main.models.Usuario;
import com.codeprojectz.main.repositories.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RequestMapping("/usuario")
@RestController
public class UsuarioController {

    @Autowired
    UsuarioRepository usuarioRepository;

    @PostMapping("/criar")
    public ResponseEntity<Usuario> saveUsuario(@RequestBody @Valid UsuarioRecordDto usuarioRecordDto) {
        var usuario = new Usuario();
        BeanUtils.copyProperties(usuarioRecordDto, usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioRepository.save(usuario));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getOneUsuario(@PathVariable(value = "id") Integer id){
        Optional<Usuario> usuarioO = usuarioRepository.findById(id);
        if(usuarioO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuarios no found.");
        }
        usuarioO.get().add(linkTo(methodOn(UsuarioController.class).getAllUsuarios()).withRel("Usuarios List"));
        return ResponseEntity.status(HttpStatus.OK).body(usuarioO.get());
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Usuario>> getAllUsuarios(){
        List<Usuario> usuariosList = usuarioRepository.findAll();
        if(!usuariosList.isEmpty()) {
            for(Usuario usuario : usuariosList) {
                int id = usuario.getUserID();
                usuario.add(linkTo(methodOn(UsuarioController.class).getOneUsuario(id)).withSelfRel());
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(usuariosList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUsuario(@PathVariable(value="id") Integer id) {
        Optional<Usuario> usuarioO = usuarioRepository.findById(id);
        if(usuarioO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario not found.");
        }
        usuarioRepository.delete(usuarioO.get());
        return ResponseEntity.status(HttpStatus.OK).body("Usuario deleted successfully.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUsuario(@PathVariable(value="id") Integer id,
                                                @RequestBody @Valid UsuarioRecordDto usuarioRecordDto) {
        Optional<Usuario> usuarioO = usuarioRepository.findById(id);
        if(usuarioO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario not found.");
        }
        var usuarioModel = usuarioO.get();
        BeanUtils.copyProperties(usuarioRecordDto, usuarioModel);
        return ResponseEntity.status(HttpStatus.OK).body(usuarioRepository.save(usuarioModel));
    }

    @GetMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody UsuarioRecordDto usuarioRecordDto){

        var user = usuarioRepository.findByEmailAndSenha(usuarioRecordDto.email(), usuarioRecordDto.senha());

        if(user==null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(user);
    }
}
