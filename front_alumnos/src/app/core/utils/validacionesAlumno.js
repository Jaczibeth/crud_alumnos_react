export const validarSoloLetras = (valor) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    return regex.test(valor.trim());
};

export const validarControl = (valor) => {
    const regex = /^\d{8}$/;
    if (!regex.test(valor)) return false;
    const prefijo = parseInt(valor.substring(0, 2), 10);
    return prefijo >= 22 && prefijo <= 27;
};

export const validarTelefono = (valor) => {
    if (!/^\d{10}$/.test(valor)) return false;
    if (valor.startsWith('953') || valor.startsWith('951') || valor.startsWith('55')) return true;
    return false;
};

export const validarEmail = (valor) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(valor.trim());
};

export const validarCamposObligatorios = (data) => {
    if (!data.nombre || !validarSoloLetras(data.nombre)) return false;
    if (!data.apellidos || !validarSoloLetras(data.apellidos)) return false;
    if (!data.carrera) return false;
    if (!validarControl(data.control)) return false;
    if (!validarTelefono(data.telefono)) return false;
    if (!validarEmail(data.email)) return false;
    return true;
};
