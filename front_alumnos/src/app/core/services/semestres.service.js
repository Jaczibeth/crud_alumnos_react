import api from './api';

export const obtenerSemestres = async () => {
    const response = await api.get('/semestres/traer-semestres');
    return response.data;
};

export const obtenerSemestrePorId = async (id) => {
    const response = await api.get(`/semestres/traer-semestre/${id}`);
    return response.data;
};

export const crearSemestre = async (data) => {
    const response = await api.post('/semestres/insertar-semestre', data);
    return response.data;
};

export const actualizarSemestre = async (id, data) => {
    const response = await api.put(`/semestres/editar-semestre/${id}`, data);
    return response.data;
};

export const eliminarSemestre = async (id) => {
    const response = await api.delete(`/semestres/eliminar-semestre/${id}`);
    return response.data;
};
