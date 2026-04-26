export const validarControl = (control) => {
    const regex = /^\d{8}$/;
    return regex.test(control);
};

export const validarTelefono = (telefono) => {
    const regex = /^\d{10}$/;
    return regex.test(telefono);
};

export const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validarCamposObligatorios = (data) => {
    const { nombre, apellidos, carrera, control, telefono, email } = data;
    return nombre.trim() !== '' && 
           apellidos.trim() !== '' && 
           carrera !== '' && 
           validarControl(control) && 
           validarTelefono(telefono) && 
           validarEmail(email);
};
