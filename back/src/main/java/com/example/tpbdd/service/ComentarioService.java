package com.example.tpbdd.service;

import com.example.tpbdd.model.Comentario;
import com.example.tpbdd.repository.ComentarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;


@Service
public class ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepository;



    public List<Comentario> getAllComentarios() {
        return comentarioRepository.findAll();
    }

    public Comentario getComentarioById(Long id) {
        return comentarioRepository.findById(id).get();
    }

    public Comentario saveComentario(Comentario comentario) {
        return comentarioRepository.save(comentario);
    }

    public void deleteComentario(Long id) {
        comentarioRepository.deleteById(id);
    }

    public Comentario updateComentario(Long id, Comentario comentario) {
        Comentario comentarioToUpdate = comentarioRepository.findById(id).get();
        Comentario newComentario = new Comentario();
        newComentario.setAerolinea(comentario.getAerolinea());
        newComentario.setComentario(comentario.getComentario());
        comentarioRepository.deleteById(id);
        Random random = new Random();
        Long randomId = (long) random.nextInt(1_000_000); // Número aleatorio entre 0 y 999,999
        newComentario.setId(randomId);
        return comentarioRepository.save(newComentario);
    }


}
