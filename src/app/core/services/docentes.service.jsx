export const crearDocente = async (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Docente registrado:", data);
            resolve({ success: true, data });
        }, 800);
    });
};