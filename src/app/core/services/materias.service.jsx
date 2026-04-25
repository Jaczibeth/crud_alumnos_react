export const crearMateria = async (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Materia registrada:", data);
            resolve({ success: true, data });
        }, 800);
    });
};

export const verificarClave = async (clave) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            
            resolve(clave === "12345");
        }, 400);
    });
};