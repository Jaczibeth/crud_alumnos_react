// ============================================================
// useAlumnoForm.js
// Capa 2 – Aplicación: lógica del formulario de registro.
// Valida los datos y llama a onRegistrar() (inyectado desde
// Alumnos.jsx) para agregar el alumno a la lista compartida.
// Resetea el formulario tras un registro exitoso.
// ============================================================

import { useState } from 'react';
import Swal from 'sweetalert2';
import { validarCamposObligatorios } from '../utils/validacionesAlumno';

export const useAlumnoForm = (initialState, onRegistrar) => {
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

        // Delega el guardado al hook de lista (useAlumnos), respetando capas
        if (onRegistrar) {
            onRegistrar(formData);
        }

        Swal.fire({
            title: '¡Registrado!',
            text: 'Alumno registrado correctamente.',
            icon: 'success',
            confirmButtonColor: '#3b4cca'
        });

        // Resetea el formulario después del registro exitoso
        setFormData(initialState);
    };

    return {
        formData,
        handleChange,
        handleSave,
        isValid: validarCamposObligatorios(formData)
    };
};
