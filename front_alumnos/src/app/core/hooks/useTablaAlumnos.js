
import { useState, useEffect } from 'react';
import { obtenerAlumnos } from '../services/alumnos.service';

export const useTablaAlumnos = () => {
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    const columnas = [
        { key: 'control',   label: 'N° Control' },
        { key: 'nombre',    label: 'Nombre'      },
        { key: 'apellidos', label: 'Apellidos'   },
        { key: 'carrera',   label: 'Carrera', tipo: 'badge' },
        { key: 'telefono',  label: 'Teléfono'    },
        { key: 'email',     label: 'Email'       }
    ];

    useEffect(() => {
        const cargar = async () => {
            try {
                setLoading(true);
                const data = await obtenerAlumnos();
                setRegistros(data);
            } catch {
                setError('Error al cargar los alumnos');
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    return { registros, columnas, loading, error };
};
