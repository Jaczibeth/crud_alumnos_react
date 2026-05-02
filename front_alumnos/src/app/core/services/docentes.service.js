import api from './api';

export const obtenerDocentes = async () => {
    const response = await api.get('/docentes/traer-docentes');
    return response.data;
};

export const obtenerDocentePorId = async (id) => {
    const response = await api.get(`/docentes/traer-docente/${id}`);
    return response.data;
};

export const crearDocente = async (data) => {
    const response = await api.post('/docentes/insertar-docente', data);
    return response.data;
};

export const actualizarDocente = async (id, data) => {
    const response = await api.put(`/docentes/editar-docente/${id}`, data);
    return response.data;
};

export const eliminarDocente = async (id) => {
    const response = await api.delete(`/docentes/eliminar-docente/${id}`);
    return response.data;
};
