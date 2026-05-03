export const validarMateria = (data) => {
    if (!data.nombre || data.nombre.trim() === '') return 'Nombre de la materia es obligatorio';
    if (!data.creditos || data.creditos < 1 || data.creditos > 5) return 'Créditos debe ser entre 1 y 5';
    if (!data.semestre_id) return 'Selecciona un semestre';
    return null;
};
