import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { obtenerDocentes, crearDocente } from "../services/docentes.service";
import { validarDocente } from "../utils/validacionesDocente";

const erroresIniciales = {
    nombre: false,
    apellidos: false,
    especialidad: false,
    cedula: false,
    telefono: false,
    email: false
};

const validarSoloLetras = (v) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(v.trim());
const validarCedula = (v) => /^\d{8}$/.test(v.trim());
const validarTelefono = (v) => {
    if (!/^\d{10}$/.test(v)) return false;
    return v.startsWith('953') || v.startsWith('951') || v.startsWith('55');
};
const validarEmail = (v) => {
    const regex = /^[^\s@]+@tectlaxiaco\.edu\.mx$/;
    return regex.test(v.trim());
};

export const useDocentes = () => {
    const [form, setForm] = useState({
        nombre: '',
        apellidos: '',
        especialidad: '',
        cedula: '',
        telefono: '',
        email: ''
    });
    const [errores, setErrores] = useState(erroresIniciales);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [docentes, setDocentes] = useState([]);

    const cargarDocentes = async () => {
        try {
            const data = await obtenerDocentes();
            setDocentes(data);
        } catch (err) {
            console.error(err);
        }
    };

    const validarCampo = (nombre, valor) => {
        if (!valor || valor.trim() === '') return false;
        switch (nombre) {
            case 'nombre': return validarSoloLetras(valor);
            case 'apellidos': return validarSoloLetras(valor);
            case 'especialidad': return valor.trim() !== '';
            case 'cedula': return validarCedula(valor);
            case 'telefono': return validarTelefono(valor);
            case 'email': return validarEmail(valor);
            default: return false;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let val = value;

        if (name === 'cedula') val = value.replace(/\D/g, '').slice(0, 8);
        if (name === 'telefono') val = value.replace(/\D/g, '').slice(0, 10);

        setForm({ ...form, [name]: val });

        if (val.trim() === '') {
            setErrores((prev) => ({ ...prev, [name]: false }));
        } else if (!validarCampo(name, val)) {
            setErrores((prev) => ({ ...prev, [name]: true }));
        } else {
            setErrores((prev) => ({ ...prev, [name]: false }));
        }
    };

    const verificarDuplicados = async (cedula, telefono, email) => {
        try {
            const existentes = await obtenerDocentes();
            if (existentes.some((d) => d.cedula?.trim() === cedula.trim())) {
                return 'La cédula profesional ya está registrada';
            }
            if (existentes.some((d) => d.telefono?.trim() === telefono.trim())) {
                return 'El teléfono ya está registrado';
            }
            if (existentes.some((d) => d.email?.trim() === email.trim())) {
                return 'El email ya está registrado';
            }
            return null;
        } catch {
            return null;
        }
    };

    const guardarDocente = async () => {
        const nuevosErrores = {};
        Object.keys(erroresIniciales).forEach((key) => {
            nuevosErrores[key] = !validarCampo(key, form[key]);
        });
        setErrores(nuevosErrores);

        const camposFaltantes = Object.entries(nuevosErrores)
            .filter(([, err]) => err)
            .map(([campo]) => campo);

        if (camposFaltantes.length > 0) {
            const etiquetas = {
                nombre: 'Nombre (solo letras)',
                apellidos: 'Apellidos (solo letras)',
                especialidad: 'Especialidad',
                cedula: 'Cédula (8 dígitos)',
                telefono: 'Teléfono (953/951/55, 10 dígitos)',
                email: 'Email (debe ser @tectlaxiaco.edu.mx)'
            };
            const lista = camposFaltantes.map((c) => etiquetas[c]).join('<br>');

            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos o inválidos',
                html: `Por favor corrige:<br><br>${lista}`,
                confirmButtonColor: '#d33'
            });
            return;
        }

        const duplicado = await verificarDuplicados(form.cedula, form.telefono, form.email);
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
                    <p><b>Nombre:</b> ${form.nombre} ${form.apellidos}</p>
                    <p><b>Especialidad:</b> ${form.especialidad}</p>
                    <p><b>Cédula:</b> ${form.cedula}</p>
                    <p><b>Teléfono:</b> ${form.telefono}</p>
                    <p><b>Email:</b> ${form.email}</p>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Sí, registrar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3b4cca',
            cancelButtonColor: '#64748b'
        });

        if (!confirmacion.isConfirmed) return;

        setSubmitting(true);
        try {
            await crearDocente(form);
            Swal.fire({
                icon: 'success',
                title: '¡Registrado!',
                text: 'Docente registrado correctamente.',
                confirmButtonColor: '#3b4cca',
                timer: 2500
            });
            setForm({ nombre: '', apellidos: '', especialidad: '', cedula: '', telefono: '', email: '' });
            setErrores(erroresIniciales);
            cargarDocentes();
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar',
                text: 'No se pudo conectar con el servidor.',
                confirmButtonColor: '#d33'
            });
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        cargarDocentes();
    }, []);

    return { guardarDocente, loading, form, errores, submitting, handleChange, docentes };
};
