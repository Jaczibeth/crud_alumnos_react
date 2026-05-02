import React from 'react';
import Swal from 'sweetalert2';
import TablaGeneral from '../../shared/components/tabla/TablaGeneral';
import { actualizarAlumno, eliminarAlumno, obtenerAlumnos } from '../../core/services/alumnos.service';

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

const ListaAlumnos = ({ registros, columnas, loading, error, recargar }) => {

    const handleVer = (registro) => {
        Swal.fire({
            title: `${registro.nombre} ${registro.apellido || ''}`,
            html: `
                <div style="text-align:left;line-height:1.9">
                    <p><b>N° Control:</b> ${registro.numeroControl || 'N/A'}</p>
                    <p><b>Carrera:</b> ${registro.carrera || 'N/A'}</p>
                    <p><b>Teléfono:</b> ${registro.telefono || 'N/A'}</p>
                    <p><b>Email:</b> ${registro.email || 'N/A'}</p>
                </div>
            `,
            icon: 'info',
            confirmButtonColor: '#3b4cca'
        });
    };

    const handleEditar = async (registro) => {
        const { value: formValues } = await Swal.fire({
            title: 'Editar Alumno',
            html: `
                <input id="swal-nombre" class="swal2-input" placeholder="Nombre (solo letras)" value="${registro.nombre || ''}">
                <input id="swal-apellido" class="swal2-input" placeholder="Apellidos (solo letras)" value="${registro.apellido || ''}">
                <input id="swal-carrera" class="swal2-input" placeholder="Carrera" value="${registro.carrera || ''}">
                <input id="swal-control" class="swal2-input" placeholder="N° Control (8 dígitos, 22-27)" value="${registro.numeroControl || ''}">
                <input id="swal-telefono" class="swal2-input" placeholder="Teléfono (10 dígitos, 953/951/55)" value="${registro.telefono || ''}">
                <input id="swal-email" class="swal2-input" placeholder="Email" value="${registro.email || ''}">
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const nombre = document.getElementById('swal-nombre').value;
                const apellido = document.getElementById('swal-apellido').value;
                const carrera = document.getElementById('swal-carrera').value;
                const control = document.getElementById('swal-control').value;
                const telefono = document.getElementById('swal-telefono').value;
                const email = document.getElementById('swal-email').value;

                if (!validarSoloLetras(nombre)) {
                    Swal.showValidationMessage('El nombre solo debe contener letras');
                    return false;
                }
                if (!validarSoloLetras(apellido)) {
                    Swal.showValidationMessage('Los apellidos solo deben contener letras');
                    return false;
                }
                if (!carrera.trim()) {
                    Swal.showValidationMessage('La carrera es obligatoria');
                    return false;
                }
                if (!validarControl(control)) {
                    Swal.showValidationMessage('N° Control: 8 dígitos numéricos, rango 22-27');
                    return false;
                }
                if (!validarTelefono(telefono)) {
                    Swal.showValidationMessage('Teléfono: 10 dígitos, debe iniciar con 953, 951 o 55');
                    return false;
                }
                if (!validarEmail(email)) {
                    Swal.showValidationMessage('El formato del correo no es válido');
                    return false;
                }

                return {
                    nombre,
                    apellido,
                    carrera,
                    numeroControl: control,
                    telefono,
                    email,
                    imagenURL: registro.imagenURL || ''
                };
            }
        });

        if (formValues) {
            try {
                const existentes = await obtenerAlumnos();
                const otroControl = existentes.some(
                    (a) => String(a.numeroControl).trim() === formValues.numeroControl.trim() && a.id !== registro.id
                );
                const otroTelefono = existentes.some(
                    (a) => a.telefono?.trim() === formValues.telefono.trim() && a.id !== registro.id
                );
                const otroEmail = existentes.some(
                    (a) => a.email?.trim() === formValues.email.trim() && a.id !== registro.id
                );

                if (otroControl) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Duplicado',
                        text: 'El número de control ya está registrado en otro alumno',
                        confirmButtonColor: '#d33'
                    });
                    return;
                }
                if (otroTelefono) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Duplicado',
                        text: 'El teléfono ya está registrado en otro alumno',
                        confirmButtonColor: '#d33'
                    });
                    return;
                }
                if (otroEmail) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Duplicado',
                        text: 'El correo ya está registrado en otro alumno',
                        confirmButtonColor: '#d33'
                    });
                    return;
                }

                const payload = {
                    numeroControl: formValues.numeroControl,
                    nombre: formValues.nombre,
                    apellido: formValues.apellido,
                    carrera: formValues.carrera,
                    telefono: formValues.telefono,
                    email: formValues.email,
                    imagenURL: formValues.imagenURL
                };

                const actualizado = await actualizarAlumno(registro.id, payload);
                Swal.fire({
                    title: 'Actualizado',
                    text: `${formValues.nombre} fue actualizado.`,
                    icon: 'success',
                    timer: 1800,
                    showConfirmButton: false
                });
                if (recargar) recargar();
            } catch (err) {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo actualizar el alumno.',
                    icon: 'error',
                    confirmButtonColor: '#d33'
                });
            }
        }
    };

    const handleEliminar = async (registro) => {
        const result = await Swal.fire({
            title: '¿Eliminar alumno?',
            text: `¿Seguro que deseas eliminar a ${registro.nombre} ${registro.apellido || ''}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#b91c1c',
            cancelButtonColor: '#3b4cca'
        });

        if (result.isConfirmed) {
            try {
                await eliminarAlumno(registro.id);
                Swal.fire({
                    title: 'Eliminado',
                    text: `${registro.nombre} ${registro.apellido || ''} fue eliminado.`,
                    icon: 'success',
                    timer: 1800,
                    showConfirmButton: false
                });
                if (recargar) recargar();
            } catch (err) {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo eliminar el alumno.',
                    icon: 'error',
                    confirmButtonColor: '#d33'
                });
            }
        }
    };

    return (
        <TablaGeneral
            titulo="Alumnos Registrados"
            icono="bi bi-people-fill"
            columnas={columnas}
            registros={registros}
            loading={loading}
            error={error}
            onVer={handleVer}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
        />
    );
};

export default ListaAlumnos;
