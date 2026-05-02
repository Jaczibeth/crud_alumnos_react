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
    const payload = {
        numeroControl: data.control,
        nombre: data.nombre,
        apellido: data.apellidos,
        carrera: data.carrera,
        telefono: data.telefono,
        email: data.email,
        imagenURL: data.urlFoto || ''
    };
    const response = await api.post('/alumnos/insertar-alumnos', payload);
    return response.data;
};

export const actualizarAlumno = async (id, data) => {
    const payload = {
        numeroControl: data.numeroControl,
        nombre: data.nombre,
        apellido: data.apellido,
        carrera: data.carrera,
        telefono: data.telefono,
        email: data.email,
        imagenURL: data.imagenURL || ''
    };
    const response = await api.put(`/alumnos/editar-alumnos/${id}`, payload);
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
