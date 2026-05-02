import { useState, useEffect } from 'react';
import api from '../services/api';

export const columnasAlumnos = [
    { key: 'imagenURL', label: 'Foto', tipo: 'image' },
    { key: 'numeroControl', label: 'N° Control' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'apellido', label: 'Apellidos' },
    { key: 'carrera', label: 'Carrera', tipo: 'badge' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'email', label: 'Email' }
];

export const useAlumnos = () => {
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargarAlumnos = async () => {
        try {
            setLoading(true);
            const res = await api.get('/alumnos/traer-alumnos');
            setRegistros(res.data);
            setError(null);
        } catch (err) {
            setError('No se pudieron cargar los alumnos');
            setRegistros([]);
        } finally {
            setLoading(false);
        }
    };

    const agregarAlumno = async (payload) => {
        try {
            const res = await api.post('/alumnos/insertar-alumnos', payload);
            setRegistros((prev) => [...prev, res.data]);
            return res.data;
        } catch (err) {
            setError('Error al crear el alumno');
            throw err;
        }
    };

    const eliminarAlumnoLocal = async (id) => {
        try {
            await api.delete(`/alumnos/eliminar-alumnos/${id}`);
            cargarAlumnos();
        } catch (err) {
            setError('Error al eliminar el alumno');
        }
    };

    useEffect(() => {
        cargarAlumnos();
    }, []);

    return {
        registros,
        columnas: columnasAlumnos,
        loading,
        error,
        agregarAlumno,
        eliminarAlumno: eliminarAlumnoLocal,
        recargar: cargarAlumnos
    };
};
