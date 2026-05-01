package com.equipo.alumnos.mapper;
import com.equipo.alumnos.dto.AlumnoDTO;
import com.equipo.alumnos.dto.MateriaDTO;
import com.equipo.alumnos.model.Alumno;
import com.equipo.alumnos.model.Materia;

import java.util.ArrayList;
import java.util.List;
public class AlumnoMapper {
    public static AlumnoDTO mapearADTO(Alumno alumno) {
        AlumnoDTO dto = new AlumnoDTO();
        dto.setId(alumno.getId());
        dto.setNumeroControl(alumno.getNumeroControl());
        
        dto.setNombreCompleto(alumno.getNombre() + " " + alumno.getApellido());
        dto.setCarrera(alumno.getCarrera());

        
        List<MateriaDTO> materiasDTO = new ArrayList<>();
        if (alumno.getMaterias() != null) {
            for (Materia materia : alumno.getMaterias()) {
                MateriaDTO matDTO = new MateriaDTO();
                matDTO.setId(materia.getId());
                matDTO.setNombre(materia.getNombre());
                matDTO.setCreditos(materia.getCreditos());
                materiasDTO.add(matDTO);
            }
        }
        dto.setMateriasInscritas(materiasDTO);
        return dto;
    }
}
