import api from './api';

export const obtenerMaterias = async () => {
    const response = await api.get('/materias/materias');
    return response.data;
};

export const obtenerMateriaPorId = async (id) => {
    const response = await api.get(`/materias/traer-materia/${id}`);
    return response.data;
};

export const crearMateria = async (data) => {
    const response = await api.post('/materias/insertar-materia', data);
    return response.data;
};

export const actualizarMateria = async (id, data) => {
    const response = await api.put(`/materias/editar-materia/${id}`, data);
    return response.data;
};

export const verificarClave = async (nombre, semestreId) => {
    const response = await api.get('/materias/materias');
    return response.data.some((m) => m.nombre === nombre && m.semestre_id === semestreId);
};

export const eliminarMateria = async (id) => {
    const response = await api.delete(`/materias/eliminar-materia/${id}`);
    return response.data;
};
