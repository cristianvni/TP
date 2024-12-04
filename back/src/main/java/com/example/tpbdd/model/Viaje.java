package com.example.tpbdd.model;

import jakarta.persistence.*;

@Entity
@Table(name = "viaje")
public class Viaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long  id;
    private String aerolinea;
    private String origen;
    private String destino;
    private int duracion;
    private int costo;
    private String fecha;


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
