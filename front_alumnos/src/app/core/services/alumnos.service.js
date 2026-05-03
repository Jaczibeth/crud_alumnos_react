import api from './api';

export const obtenerAlumnos = async () => {
    const response = await api.get('/alumnos/traer-alumnos');
    return response.data;
};

export const obtenerAlumnoPorId = async (id) => {
    const response = await api.get(`/alumnos/traer-alumno/${id}`);
    return response.data;
};

export const crearAlumno = async (data) => {
    const response = await api.post('/alumnos/insertar-alumnos', data);
    return response.data;
};

export const actualizarAlumno = async (id, data) => {
    const response = await api.put(`/alumnos/editar-alumnos/${id}`, data);
    return response.data;
};

export const eliminarAlumno = async (id) => {
    const response = await api.delete(`/alumnos/eliminar-alumnos/${id}`);
    return response.data;
};

export const inscribirMateria = async (alumnoId, materiaId) => {
    const response = await api.post(`/alumnos/${alumnoId}/inscribir-materia/${materiaId}`);
    return response.data;
};
