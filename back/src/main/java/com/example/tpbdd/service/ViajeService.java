package com.example.tpbdd.service;

import com.example.tpbdd.model.Viaje;
import com.example.tpbdd.repository.ViajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ViajeService {

    @Autowired
    private ViajeRepository viajeRepository;


    // Crear un nuevo viaje
    public Viaje crearViaje(Viaje viaje) {
        return viajeRepository.save(viaje);
    }

    // Obtener todos los viajes
    public List<Viaje> obtenerTodosLosViajes() {
        return viajeRepository.findAll();
    }

    // Obtener un viaje por su ID
    public Optional<Viaje> obtenerViajePorId(Long id) {
        return viajeRepository.findById(id);
    }

    // Actualizar un viaje existente
    public Viaje actualizarViaje(Long id, Viaje viajeActualizado) {
        viajeActualizado.setId(id); // Asegúrate de establecer el ID
        return viajeRepository.save(viajeActualizado);
    }

    // Eliminar un viaje por su ID
    public void eliminarViaje(Long id) {
        viajeRepository.deleteById(id);
    }

}
