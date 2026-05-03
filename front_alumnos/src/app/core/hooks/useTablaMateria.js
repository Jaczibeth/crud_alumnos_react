import { useState, useEffect } from 'react';
import api from '../services/api';

export const useTablaMateria = () => {
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const columnas = [
        { key: 'nombre', label: 'Materia' },
        { key: 'creditos', label: 'Créditos' },
        { key: 'semestre_nombre', label: 'Semestre', tipo: 'badge' }
    ];

    const cargarMaterias = async () => {
        try {
            setLoading(true);
            const res = await api.get('/materias/materias');
            const data = res.data.map(m => ({
                ...m,
                semestre_nombre: m.semestre_nombre || m.semestre?.nombre || 'Sin semestre'
            }));
            setRegistros(data);
            setError(null);
        } catch (err) {
            setError('No se pudieron cargar las materias');
            setRegistros([]);
        } finally {
            setLoading(false);
        }
    };

    const eliminarMateriaLocal = async (id) => {
        try {
            await api.delete(`/materias/eliminar-materia/${id}`);
            cargarMaterias();
        } catch (err) {
            setError('Error al eliminar la materia');
        }
    };

    useEffect(() => {
        cargarMaterias();
    }, []);

    return { registros, columnas, loading, error, eliminarMateria: eliminarMateriaLocal, recargar: cargarMaterias };
};
