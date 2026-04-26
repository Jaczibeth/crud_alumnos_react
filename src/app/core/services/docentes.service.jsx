
export const crearDocente = async (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Docente registrado:', data);
            resolve({ success: true, data });
        }, 800);
    });
};


export const obtenerDocentes = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    nombre: 'Juan Carlos',
                    apellidos: 'Pérez Sandoval',
                    especialidad: 'Ingeniería de Software',
                    cedula: '12345678',
                    telefono: '9531112233',
                    email: 'j.perez@tectlaxiaco.edu.mx'
                },
                {
                    id: 2,
                    nombre: 'María Elena',
                    apellidos: 'González Vega',
                    especialidad: 'Matemáticas Aplicadas',
                    cedula: '87654321',
                    telefono: '9534445566',
                    email: 'm.gonzalez@tectlaxiaco.edu.mx'
                },
                {
                    id: 3,
                    nombre: 'Roberto',
                    apellidos: 'Martínez Cruz',
                    especialidad: 'Bases de Datos',
                    cedula: '11223344',
                    telefono: '9537778899',
                    email: 'r.martinez@tectlaxiaco.edu.mx'
                },
                {
                    id: 4,
                    nombre: 'Laura Patricia',
                    apellidos: 'Flores Ríos',
                    especialidad: 'Redes y Telecomunicaciones',
                    cedula: '55667788',
                    telefono: '9530001122',
                    email: 'l.flores@tectlaxiaco.edu.mx'
                }
            ]);
        }, 600);
    });
};