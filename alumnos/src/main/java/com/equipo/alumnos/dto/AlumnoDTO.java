package com.equipo.alumnos.dto;
import java.util.List;
import lombok.Data;

@Data
public class AlumnoDTO {
    private Long id;
    private String numeroControl;
    private String nombreCompleto; 
    private String carrera;
    private List<MateriaDTO> materiasInscritas;
}
