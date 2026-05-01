package com.equipo.alumnos.controllers;

import com.equipo.alumnos.model.Docente;
import com.equipo.alumnos.services.DocenteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/docentes")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Docentes", description = "API para la gestión de docentes")
public class DocenteController {

    @Autowired
    private DocenteService docenteService;

    @GetMapping("/traer-docentes")
    public List<Docente> traerDocentes() {
        return docenteService.obtenerTodos();
    }

    @GetMapping("/traer-docente/{id}")
    public ResponseEntity<Docente> traerUnDocente(@PathVariable Long id) {
        Optional<Docente> docente = docenteService.obtenerPorId(id);
        return docente.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/insertar-docente")
    public Docente insertarDocente(@Valid @RequestBody Docente docente) {
        return docenteService.guardarDocente(docente);
    }

    @PutMapping("/editar-docente/{id}")
    public ResponseEntity<Docente> actualizarDocente(@PathVariable Long id, @Valid @RequestBody Docente docente) {
        Optional<Docente> actualizado = docenteService.actualizarDocente(id, docente);
        return actualizado.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/eliminar-docente/{id}")
    public ResponseEntity<Void> eliminarDocente(@PathVariable Long id) {
        docenteService.eliminarDocente(id);
        return ResponseEntity.ok().build();
    }
}