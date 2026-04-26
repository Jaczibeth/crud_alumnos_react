
import { useState } from 'react';

export const useTablaDocentes = () => {
    
    const [registros, setRegistros] = useState([]);

    const columnas = [
        { key: 'cedula',       label: 'Cédula'                      },
        { key: 'nombre',       label: 'Nombre'                       },
        { key: 'apellidos',    label: 'Apellidos'                    },
        { key: 'especialidad', label: 'Especialidad', tipo: 'badge'  },
        { key: 'telefono',     label: 'Teléfono'                     },
        { key: 'email',        label: 'Email'                        }
    ];

    
    const eliminarDocente = (id) => {
        setRegistros((prev) => prev.filter((docente) => docente.id !== id));
    };

    return { registros, columnas, loading: false, error: null, eliminarDocente };
};
