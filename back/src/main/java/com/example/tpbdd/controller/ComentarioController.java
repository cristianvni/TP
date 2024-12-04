package com.example.tpbdd.controller;

import com.example.tpbdd.model.Comentario;
import com.example.tpbdd.service.ComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/comentarios")
public class ComentarioController {

    @Autowired
    private ComentarioService comentarioService;

    // Obtener todos los comentarios
    @GetMapping
    public ResponseEntity<List<Comentario>> obtenerComentarios() {
        List<Comentario> comentarios = comentarioService.getAllComentarios();
        return new ResponseEntity<>(comentarios, HttpStatus.OK);
    }

    // Obtener un comentario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Comentario> obtenerComentarioPorId(@PathVariable Long id) {
        Comentario comentario = comentarioService.getComentarioById(id);
        if (comentario != null) {
            return new ResponseEntity<>(comentario, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Agregar un nuevo comentario
    @PostMapping
    public ResponseEntity<Comentario> agregarComentario( @RequestBody Comentario comentario) {
        Comentario nuevoComentario = comentarioService.saveComentario(comentario);
        return new ResponseEntity<>(nuevoComentario, HttpStatus.CREATED);
    }

    // Actualizar un comentario existente
    @PutMapping("/{id}")
    public ResponseEntity<Comentario> actualizarComentario(@PathVariable Long id,  @RequestBody Comentario comentario) {
        Comentario comentarioActualizado = comentarioService.updateComentario(id, comentario);
        if (comentarioActualizado != null) {
            return new ResponseEntity<>(comentarioActualizado, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar un comentario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarComentario(@PathVariable Long id) {

        comentarioService.deleteComentario(id);
        return ResponseEntity.noContent().build();
    }
}