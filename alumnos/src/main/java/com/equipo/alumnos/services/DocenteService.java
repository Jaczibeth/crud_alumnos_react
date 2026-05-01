package com.equipo.alumnos.services;

import com.equipo.alumnos.model.Docente;
import com.equipo.alumnos.repository.DocenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DocenteService {

    @Autowired
    private DocenteRepository docenteRepository;

    public List<Docente> obtenerTodos() {
        return docenteRepository.findAll();
    }

    public Optional<Docente> obtenerPorId(Long id) {
        return docenteRepository.findById(id);
    }

    public Docente guardarDocente(Docente docente) {
        return docenteRepository.save(docente);
    }

    public Optional<Docente> actualizarDocente(Long id, Docente docenteDetalles) {
        return docenteRepository.findById(id).map(docenteExistente -> {
            docenteExistente.setNombre(docenteDetalles.getNombre());
            docenteExistente.setApellidos(docenteDetalles.getApellidos());
            docenteExistente.setEspecialidad(docenteDetalles.getEspecialidad());
            docenteExistente.setCedula(docenteDetalles.getCedula());
            docenteExistente.setTelefono(docenteDetalles.getTelefono());
            docenteExistente.setEmail(docenteDetalles.getEmail());
            return docenteRepository.save(docenteExistente);
        });
    }

    public void eliminarDocente(Long id) {
        docenteRepository.deleteById(id);
    }
}