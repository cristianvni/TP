package com.example.tpbdd.model;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "comentario")
public class Comentario {

    @Id

    private long id;
    private String aerolinea;
    private String comentario;


    public long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAerolinea() {
        return aerolinea;
    }

    public void setAerolinea(String aerolinea) {
        this.aerolinea = aerolinea;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }
}
