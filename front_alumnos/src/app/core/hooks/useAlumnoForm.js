import { useState } from 'react';
import Swal from 'sweetalert2';
import { obtenerAlumnos } from '../services/alumnos.service';

const erroresIniciales = {
    nombre: false,
    apellidos: false,
    carrera: false,
    control: false,
    telefono: false,
    email: false
};

const validarSoloLetras = (v) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(v.trim());

const validarControl = (v) => {
    if (!/^\d{8}$/.test(v)) return false;
    const prefijo = parseInt(v.substring(0, 2), 10);
    return prefijo >= 22 && prefijo <= 27;
};

const validarTelefono = (v) => {
    if (!/^\d{10}$/.test(v)) return false;
    return v.startsWith('953') || v.startsWith('951') || v.startsWith('55');
};

const validarEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export const useAlumnoForm = (initialState, onRegistrar) => {
    const [formData, setFormData] = useState(initialState);
    const [errores, setErrores] = useState(erroresIniciales);
    const [submitting, setSubmitting] = useState(false);

    const validarCampo = (nombre, valor) => {
        if (nombre === 'urlFoto') return true;
        if (!valor || valor.trim() === '') return false;
        switch (nombre) {
            case 'nombre': return validarSoloLetras(valor);
            case 'apellidos': return validarSoloLetras(valor);
            case 'carrera': return valor !== '';
            case 'control': return validarControl(valor);
            case 'telefono': return validarTelefono(valor);
            case 'email': return validarEmail(valor);
            default: return false;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let val = value;

        if (name === 'telefono') val = value.replace(/\D/g, '').slice(0, 10);
        if (name === 'control') val = value.replace(/\D/g, '').slice(0, 8);

        const nuevo = { ...formData, [name]: val };
        setFormData(nuevo);

        if (val.trim() === '') {
            setErrores((prev) => ({ ...prev, [name]: false }));
        } else if (!validarCampo(name, val)) {
            setErrores((prev) => ({ ...prev, [name]: true }));
        } else {
            setErrores((prev) => ({ ...prev, [name]: false }));
        }
    };

    const validarCampos = () => {
        const nuevosErrores = {};
        Object.keys(erroresIniciales).forEach((key) => {
            nuevosErrores[key] = !validarCampo(key, formData[key]);
        });
        setErrores(nuevosErrores);
        return nuevosErrores;
    };

    const verificarDuplicados = async (control, telefono, email) => {
        try {
            const existentes = await obtenerAlumnos();
            const duplicadoControl = existentes.some(
                (a) => String(a.numeroControl).trim() === control.trim()
            );
            const duplicadoTelefono = existentes.some(
                (a) => a.telefono?.trim() === telefono.trim()
            );
            const duplicadoEmail = existentes.some(
                (a) => a.email?.trim() === email.trim()
            );

            if (duplicadoControl) return 'El número de control ya está registrado';
            if (duplicadoTelefono) return 'El teléfono ya está registrado';
            if (duplicadoEmail) return 'El correo ya está registrado';
            return null;
        } catch {
            return null;
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const nuevosErrores = validarCampos();
        const camposFaltantes = Object.entries(nuevosErrores)
            .filter(([, err]) => err)
            .map(([campo]) => campo);

        if (camposFaltantes.length > 0) {
            const etiquetas = {
                nombre: 'Nombre (solo letras)',
                apellidos: 'Apellidos (solo letras)',
                carrera: 'Carrera',
                control: 'N° Control (8 dígitos, rango 22-27)',
                telefono: 'Teléfono (953, 951 o 55, 10 dígitos)',
                email: 'Email (formato correcto)'
            };
            const lista = camposFaltantes.map((c) => etiquetas[c]).join('<br>');

            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos o inválidos',
                html: `Por favor corrige los siguientes campos:<br><br>${lista}`,
                confirmButtonColor: '#d33'
            });
            return;
        }

        const duplicado = await verificarDuplicados(
            formData.control,
            formData.telefono,
            formData.email
        );

        if (duplicado) {
            Swal.fire({
                icon: 'error',
                title: 'Registro duplicado',
                text: duplicado,
                confirmButtonColor: '#d33'
            });
            return;
        }

        const confirmacion = await Swal.fire({
            icon: 'question',
            title: 'Confirmar registro',
            html: `
                <div style="text-align:left;line-height:1.8">
                    <p><b>Nombre:</b> ${formData.nombre} ${formData.apellidos}</p>
                    <p><b>Carrera:</b> ${formData.carrera}</p>
                    <p><b>Control:</b> ${formData.control}</p>
                    <p><b>Teléfono:</b> ${formData.telefono}</p>
                    <p><b>Email:</b> ${formData.email}</p>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Sí, registrar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3b4cca',
            cancelButtonColor: '#64748b'
        });

        if (!confirmacion.isConfirmed) return;

        try {
            setSubmitting(true);
            const payload = {
                numeroControl: formData.control,
                nombre: formData.nombre,
                apellido: formData.apellidos,
                carrera: formData.carrera,
                telefono: formData.telefono,
                email: formData.email,
                imagenURL: formData.urlFoto?.trim() || ''
            };
            const nuevo = await onRegistrar(payload);
            if (!nuevo) throw new Error('No se recibió respuesta del servidor');

            Swal.fire({
                icon: 'success',
                title: '¡Registrado!',
                text: 'Alumno registrado correctamente.',
                confirmButtonColor: '#3b4cca',
                timer: 2500
            });
            setFormData(initialState);
            setErrores(erroresIniciales);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar',
                text: 'No se pudo conectar con el servidor para registrar el alumno.',
                confirmButtonColor: '#d33'
            });
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const getErrorText = (campo) => {
        const mensajes = {
            nombre: 'Solo se permiten letras',
            apellidos: 'Solo se permiten letras',
            carrera: 'Selecciona una carrera',
            control: '8 dígitos, rango 22-27',
            telefono: 'Debe iniciar con 953, 951 o 55',
            email: 'Formato de correo no válido'
        };
        return errores[campo] ? mensajes[campo] : null;
    };

    return {
        formData,
        handleChange,
        handleSave,
        isValid: !Object.values(errores).some(Boolean),
        errores,
        submitting,
        getErrorText
    };
};
