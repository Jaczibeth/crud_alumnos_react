package com.equipo.alumnos.repository;

import com.equipo.alumnos.model.Materia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MateriaRepository extends JpaRepository<Materia, Long> {
    List<Materia> findBySemestreId(Long semestreId);
}
