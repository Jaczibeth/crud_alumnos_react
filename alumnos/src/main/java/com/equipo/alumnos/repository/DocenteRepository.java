package com.equipo.alumnos.repository;

import com.equipo.alumnos.model.Docente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DocenteRepository extends JpaRepository<Docente, Long> {
    
    
    Optional<Docente> findByCedula(String cedula);
    
    
    Optional<Docente> findByEmail(String email);
    
    
    List<Docente> findByEspecialidad(String especialidad);
    
    
    List<Docente> findByNombreContainingIgnoreCase(String nombre);
    
    
    List<Docente> findByApellidosContainingIgnoreCase(String apellidos);
    
  
    boolean existsByCedula(String cedula);
    
    
    boolean existsByEmail(String email);
}