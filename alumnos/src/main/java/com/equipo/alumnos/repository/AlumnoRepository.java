package com.equipo.alumnos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.equipo.alumnos.model.Alumno;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {

}
