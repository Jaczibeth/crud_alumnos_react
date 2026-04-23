import { useState } from 'react';
import Swal from 'sweetalert2';
import { validarCamposObligatorios } from '../utils/validacionesAlumno';

export const useAlumnoForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'telefono') {
            const val = value.replace(/\D/g, '').slice(0, 10);
            setFormData({ ...formData, [name]: val });
            return;
        }
        
        if (name === 'control') {
            const val = value.replace(/\D/g, '').slice(0, 8);
            setFormData({ ...formData, [name]: val });
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        
        if (!validarCamposObligatorios(formData)) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, complete todos los campos correctamente.',
                icon: 'error',
                confirmButtonColor: '#d33'
            });
            return;
        }

        Swal.fire({
            title: '¡Registrado!',
            text: 'Alumno registrado correctamente.',
            icon: 'success',
            confirmButtonColor: '#3b4cca'
        });
    };

    return {
        formData,
        handleChange,
        handleSave,
        isValid: validarCamposObligatorios(formData)
    };
};
