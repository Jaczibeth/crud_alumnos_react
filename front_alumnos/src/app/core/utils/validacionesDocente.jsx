export const validarSoloLetras = (v) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(v.trim());
export const validarCedula = (v) => /^\d{8}$/.test(v.trim());
export const validarTelefono = (v) => {
    if (!/^\d{10}$/.test(v)) return false;
    return v.startsWith('953') || v.startsWith('951') || v.startsWith('55');
};
export const validarEmailInstitucional = (v) => {
    const regex = /^[^\s@]+@tectlaxiaco\.edu\.mx$/;
    return regex.test(v.trim());
};

export const validarDocente = (data) => {
    if (!data.nombre || !validarSoloLetras(data.nombre)) return 'Nombre inválido (solo letras)';
    if (!data.apellidos || !validarSoloLetras(data.apellidos)) return 'Apellidos inválidos (solo letras)';
    if (!data.especialidad || data.especialidad.trim() === '') return 'Especialidad es obligatoria';
    if (!data.cedula || !validarCedula(data.cedula)) return 'Cédula: exactamente 8 dígitos numéricos';
    if (!data.telefono || !validarTelefono(data.telefono)) return 'Teléfono: 10 dígitos, inicio 953/951/55';
    if (!data.email || !validarEmailInstitucional(data.email)) return 'Email debe ser @tectlaxiaco.edu.mx';
    return null;
};
