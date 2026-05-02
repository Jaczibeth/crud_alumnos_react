import { useState, useEffect } from 'react';
import api from '../services/api';

export const useTablaDocentes = () => {
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const columnas = [
        { key: 'cedula', label: 'Cédula' },
        { key: 'nombre', label: 'Nombre' },
        { key: 'apellidos', label: 'Apellidos' },
        { key: 'especialidad', label: 'Especialidad', tipo: 'badge' },
        { key: 'telefono', label: 'Teléfono' },
        { key: 'email', label: 'Email' }
    ];

    const cargarDocentes = async () => {
        try {
            setLoading(true);
            const res = await api.get('/docentes/traer-docentes');
            setRegistros(res.data);
            setError(null);
        } catch (err) {
            setError('No se pudieron cargar los docentes');
            setRegistros([]);
        } finally {
            setLoading(false);
        }
    };

    const eliminarDocenteLocal = async (id) => {
        try {
            await api.delete(`/docentes/eliminar-docente/${id}`);
            cargarDocentes();
        } catch (err) {
            setError('Error al eliminar el docente');
        }
    };

    useEffect(() => {
        cargarDocentes();
    }, []);

    return { registros, columnas, loading, error, eliminarDocente: eliminarDocenteLocal, recargar: cargarDocentes };
};
