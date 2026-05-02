import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ERR_NETWORK') {
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo en el puerto 8080.'
            });
        } else if (error.response) {
            const { status, data } = error.response;
            const mensaje = data?.message || `Error del servidor (${status})`;

            if (status === 400) {
                Swal.fire({ icon: 'warning', title: 'Datos inválidos', text: mensaje });
            } else if (status === 409) {
                Swal.fire({ icon: 'error', title: 'Duplicado', text: 'El registro ya existe en la base de datos.' });
            } else if (status === 500) {
                Swal.fire({ icon: 'error', title: 'Error interno', text: mensaje });
            } else {
                Swal.fire({ icon: 'error', title: 'Error', text: mensaje });
            }
        } else {
            Swal.fire({ icon: 'error', title: 'Error', text: error.message });
        }
        return Promise.reject(error);
    }
);

export default api;
