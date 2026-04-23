/**
 * Valida que el número de control tenga exactamente 8 dígitos numéricos
 * @param {string} control 
 * @returns {boolean}
 */
export const validarControl = (control) => {
    const regex = /^\d{8}$/;
    return regex.test(control);
};
