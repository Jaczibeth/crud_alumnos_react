package com.equipo.alumnos.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Materia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre de la materia es obligatorio")
    private String nombre;

    @Min(value = 1, message = "La materia debe tener al menos 1 crédito")
    private Integer creditos;

    // Muchas materias pertenecen a UN semestre
    @ManyToOne
    @JoinColumn(name = "semestre_id")
    private Semestre semestre;

    
    @ManyToMany(mappedBy = "materias")
    private List<Alumno> alumnos = new ArrayList<>();
}