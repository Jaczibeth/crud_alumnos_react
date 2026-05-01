
import { useState } from 'react';

export const useTablaMateria = () => {
    
    const [registros, setRegistros] = useState([]);

    const columnas = [
        { key: 'clave',     label: 'Clave'                    },
        { key: 'nombre',    label: 'Materia'                  },
        { key: 'semestre',  label: 'Semestre', tipo: 'badge'  },
        { key: 'docenteId', label: 'Docente'                  }
    ];

    
    const eliminarMateria = (id) => {
        setRegistros((prev) => prev.filter((materia) => materia.id !== id));
    };

    return { registros, columnas, loading: false, error: null, eliminarMateria };
};
