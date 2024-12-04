package com.example.tpbdd.controller;

import com.example.tpbdd.model.Viaje;
import com.example.tpbdd.service.ViajeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/viajes")
public class ViajeController {

    @Autowired
    private ViajeService viajeService;

    @PostMapping
    public ResponseEntity<Viaje> crearViaje(@RequestBody Viaje viaje) {
        Viaje nuevoViaje = viajeService.crearViaje(viaje);
        return new ResponseEntity<>(nuevoViaje, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Viaje>> obtenerTodosLosViajes() {
        List<Viaje> viajes = viajeService.obtenerTodosLosViajes();
        return new ResponseEntity<>(viajes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Viaje> obtenerViajePorId(@PathVariable Long id) {
        Optional<Viaje> viaje = viajeService.obtenerViajePorId(id);
        return viaje.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Viaje> actualizarViaje(@PathVariable Long id, @RequestBody Viaje viaje ) {
        Viaje viajeActualizado = viajeService.actualizarViaje(id, viaje);
        return new ResponseEntity<>(viajeActualizado, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarViaje(@PathVariable Long id) {
        viajeService.eliminarViaje(id);
        return ResponseEntity.noContent().build();
    }
}