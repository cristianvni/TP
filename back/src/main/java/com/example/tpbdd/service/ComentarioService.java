package com.example.tpbdd.service;

import com.example.tpbdd.model.Comentario;
import com.example.tpbdd.repository.ComentarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


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
        comentarioToUpdate.setComentario(comentario.getComentario());
        return comentarioRepository.save(comentarioToUpdate);
    }


}
