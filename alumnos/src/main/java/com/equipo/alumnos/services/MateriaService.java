package com.equipo.alumnos.services;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.equipo.alumnos.model.Materia;
import com.equipo.alumnos.repository.MateriaRepository;

@Service
public class MateriaService {
    @Autowired
    private MateriaRepository materiaRepository;
    
    public List<Materia> obtenerTodos() {
        return materiaRepository.findAll();
    }
    
    public Optional<Materia> obtenerPorId(Long id) {
        return materiaRepository.findById(id);
    }
    
    public List<Materia> obtenerPorSemestre(Long semestreId) {
        return materiaRepository.findBySemestreId(semestreId);
    }
    
    public Materia guardarMateria(Materia materia) {
        return materiaRepository.save(materia);
    }
    
    public Optional<Materia> actualizarMateria(Long id, Materia materiaDetalles) {
        return materiaRepository.findById(id).map(materiaExistente -> {
            materiaExistente.setNombre(materiaDetalles.getNombre());
            materiaExistente.setCreditos(materiaDetalles.getCreditos());
            
            materiaExistente.setSemestre(materiaDetalles.getSemestre());

            return materiaRepository.save(materiaExistente);
        });
    }
    public void eliminarMateria(Long id) {
        materiaRepository.deleteById(id);
    }
}