package com.example.tpbdd.repository;

import com.example.tpbdd.model.Viaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ViajeRepository extends JpaRepository<Viaje, Long> {

}
