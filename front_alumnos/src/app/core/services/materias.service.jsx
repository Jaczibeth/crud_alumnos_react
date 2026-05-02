
export const crearMateria = async (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Materia registrada:', data);
            resolve({ success: true, data });
        }, 800);
    });
};


export const verificarClave = async (clave) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(clave === '12345');
        }, 400);
    });
};


export const obtenerMaterias = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    nombre: 'Matemáticas Discretas',
                    clave: 'MAT-101',
                    semestre: '3',
                    docenteId: 'Prof. Juan Carlos Pérez'
                },
                {
                    id: 2,
                    nombre: 'Programación Orientada a Objetos',
                    clave: 'ISW-201',
                    semestre: '4',
                    docenteId: 'Profa. María Elena González'
                },
                {
                    id: 3,
                    nombre: 'Bases de Datos',
                    clave: 'ISW-301',
                    semestre: '5',
                    docenteId: 'Prof. Roberto Martínez'
                },
                {
                    id: 4,
                    nombre: 'Redes de Computadoras',
                    clave: 'TIC-401',
                    semestre: '6',
                    docenteId: 'Profa. Laura Patricia Flores'
                }
            ]);
        }, 600);
    });
};