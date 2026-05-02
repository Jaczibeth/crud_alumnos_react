
export const crearAlumno = async (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Alumno registrado:', data);
            resolve({ success: true, data });
        }, 800);
    });
};


export const obtenerAlumnos = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    nombre: 'Ana Sofía',
                    apellidos: 'Ramírez Torres',
                    carrera: 'Ingeniería',
                    control: '22620001',
                    telefono: '9531234567',
                    email: 'ana.ramirez@estudiante.edu.mx'
                },
                {
                    id: 2,
                    nombre: 'Luis Miguel',
                    apellidos: 'García Hernández',
                    carrera: 'Licenciatura',
                    control: '22620002',
                    telefono: '9539876543',
                    email: 'luis.garcia@estudiante.edu.mx'
                },
                {
                    id: 3,
                    nombre: 'Valeria',
                    apellidos: 'López Mendoza',
                    carrera: 'Ingeniería',
                    control: '22620003',
                    telefono: '9534561230',
                    email: 'valeria.lopez@estudiante.edu.mx'
                },
                {
                    id: 4,
                    nombre: 'Carlos',
                    apellidos: 'Morales Díaz',
                    carrera: 'Licenciatura',
                    control: '22620004',
                    telefono: '9537890123',
                    email: 'carlos.morales@estudiante.edu.mx'
                },
                {
                    id: 5,
                    nombre: 'Gabriela',
                    apellidos: 'Sánchez Ruiz',
                    carrera: 'Ingeniería',
                    control: '22620005',
                    telefono: '9532345678',
                    email: 'gabriela.sanchez@estudiante.edu.mx'
                }
            ]);
        }, 600);
    });
};
