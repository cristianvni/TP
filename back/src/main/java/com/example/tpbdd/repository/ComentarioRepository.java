package com.example.tpbdd.repository;

import com.example.tpbdd.model.Comentario;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ComentarioRepository extends MongoRepository<Comentario, Long> {
}
