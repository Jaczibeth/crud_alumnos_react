import Swal from 'sweetalert2';

const Alertas = {
    success: (mensaje) => {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: mensaje,
            timer: 2000,
            showConfirmButton: false
        });
    },
    error: (mensaje) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: mensaje
        });
    }
};

export default Alertas;