package com.equipo.alumnos.services;

import java.util.List;
import java.util.Optional;

import com.equipo.alumnos.model.Materia;
import com.equipo.alumnos.repository.MateriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.equipo.alumnos.model.Alumno;
import com.equipo.alumnos.repository.AlumnoRepository;
@Service
public class AlumnoService {
    @Autowired
    private AlumnoRepository alumnoRepository;

    @Autowired
    private MateriaRepository materiaRepository;
    public List<Alumno> obtenerTodos() {
        return alumnoRepository.findAll();
    }
    public Optional<Alumno> obtenerPorId(Long id) {
        return alumnoRepository.findById(id);
    }
    public Alumno guardarAlumno(Alumno alumno) {

        return alumnoRepository.save(alumno);
    }
    public Optional<Alumno> actualizarAlumno(Long id, Alumno alumnoDetalles) {
        return alumnoRepository.findById(id).map(alumnoExistente -> {
            alumnoExistente.setNombre(alumnoDetalles.getNombre());
            alumnoExistente.setApellido(alumnoDetalles.getApellido());
            alumnoExistente.setEmail(alumnoDetalles.getEmail());
            alumnoExistente.setNumeroControl(alumnoDetalles.getNumeroControl());
            alumnoExistente.setTelefono(alumnoDetalles.getTelefono());
            alumnoExistente.setCarrera(alumnoDetalles.getCarrera());
            alumnoExistente.setImagenURL(alumnoDetalles.getImagenURL());
            return alumnoRepository.save(alumnoExistente);
        });
    }
    public void eliminarAlumno(Long id) {
        alumnoRepository.deleteById(id);
    }
    
    public Alumno inscribirMateria(Long alumnoId, Long materiaId) {
        
        Optional<Alumno> alumnoOpt = alumnoRepository.findById(alumnoId);
        
        Optional<Materia> materiaOpt = materiaRepository.findById(materiaId);
        if (alumnoOpt.isPresent() && materiaOpt.isPresent()) {
            Alumno alumno = alumnoOpt.get();
            Materia materia = materiaOpt.get();
            
            alumno.getMaterias().add(materia);
            
            return alumnoRepository.save(alumno);
        } else {
            throw new RuntimeException("Alumno o Materia no encontrados");
        }
    }
}