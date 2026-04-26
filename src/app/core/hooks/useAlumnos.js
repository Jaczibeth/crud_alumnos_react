
import { useState } from 'react';

export const columnasAlumnos = [
    { key: 'control',   label: 'N° Control'               },
    { key: 'nombre',    label: 'Nombre'                    },
    { key: 'apellidos', label: 'Apellidos'                 },
    { key: 'carrera',   label: 'Carrera',   tipo: 'badge'  },
    { key: 'telefono',  label: 'Teléfono'                  },
    { key: 'email',     label: 'Email'                     }
];

export const useAlumnos = () => {
    const [registros, setRegistros] = useState([]);

    const agregarAlumno = (data) => {
        const nuevoAlumno = {
            ...data,
            id: Date.now() 
        };
        setRegistros((prev) => [...prev, nuevoAlumno]);
    };

    
    const eliminarAlumno = (id) => {
        setRegistros((prev) => prev.filter((alumno) => alumno.id !== id));
    };

    return {
        registros,
        columnas: columnasAlumnos,
        loading: false,
        error: null,
        agregarAlumno,
        eliminarAlumno
    };
};
