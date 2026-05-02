import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { crearMateria, verificarClave, obtenerMaterias } from "../services/materias.service";
import api from "../services/api";

const erroresIniciales = {
    nombre: false,
    creditos: false,
    semestre: false
};

export const useMaterias = () => {
    const [form, setForm] = useState({
        nombre: '',
        creditos: '',
        semestre: ''
    });
    const [errores, setErrores] = useState(erroresIniciales);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [semestres, setSemestres] = useState([]);

    const cargarSemestres = async () => {
        try {
            const res = await api.get('/semestres/traer-semestres');
            setSemestres(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const validarCampo = (nombre, valor) => {
        switch (nombre) {
            case 'nombre': return valor && valor.trim() !== '';
            case 'creditos': return valor && valor >= 1 && valor <= 5;
            case 'semestre': return valor && valor !== '';
            default: return false;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let val = value;

        if (name === 'creditos') val = value.replace(/\D/g, '').slice(0, 1);

        setForm({ ...form, [name]: val });

        if (val === '' || val.trim() === '') {
            setErrores((prev) => ({ ...prev, [name]: false }));
        } else if (!validarCampo(name, val)) {
            setErrores((prev) => ({ ...prev, [name]: true }));
        } else {
            setErrores((prev) => ({ ...prev, [name]: false }));
        }
    };

    const guardarMateria = async () => {
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
                nombre: 'Nombre de la materia',
                creditos: 'Créditos (1-5)',
                semestre: 'Semestre'
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

        const semestreId = Number(form.semestre);
        const semestreSeleccionado = semestres.find(s => s.id === semestreId);
        if (!semestreSeleccionado) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El semestre seleccionado no existe. Primero debes registrar los semestres.',
                confirmButtonColor: '#d33'
            });
            return;
        }

        const duplicada = await verificarClave(form.nombre, semestreId);
        if (duplicada) {
            Swal.fire({
                icon: 'error',
                title: 'Registro duplicado',
                text: 'Ya existe una materia con ese nombre en este semestre',
                confirmButtonColor: '#d33'
            });
            return;
        }

        const confirmacion = await Swal.fire({
            icon: 'question',
            title: 'Confirmar registro',
            html: `
                <div style="text-align:left;line-height:1.8">
                    <p><b>Materia:</b> ${form.nombre}</p>
                    <p><b>Créditos:</b> ${form.creditos}</p>
                    <p><b>Semestre:</b> ${semestreSeleccionado.nombre}</p>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Sí, registrar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3b4cca',
            cancelButtonColor: '#64748b'
        });

        if (!confirmacion.isConfirmed) return;

        setLoading(true);
        setSubmitting(true);
        try {
            const payload = {
                nombre: form.nombre,
                creditos: parseInt(form.creditos),
                semestre_id: semestreId
            };
            await crearMateria(payload);
            Swal.fire({
                icon: 'success',
                title: '¡Registrado!',
                text: 'Materia registrada correctamente.',
                confirmButtonColor: '#3b4cca',
                timer: 2500
            });
            setForm({ nombre: '', creditos: '', semestre: '' });
            setErrores(erroresIniciales);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar',
                text: 'No se pudo conectar con el servidor.',
                confirmButtonColor: '#d33'
            });
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    useEffect(() => {
        cargarSemestres();
    }, []);

    return { guardarMateria, loading, form, errores, submitting, handleChange, semestres };
};
