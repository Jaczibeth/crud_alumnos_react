// ============================================================
// ListaAlumnos.jsx
// Capa 1 – Presentación: vista de tabla de alumnos.
// Recibe los datos y callbacks desde Alumnos.jsx (que usa
// useAlumnos). NO gestiona estado ni lógica de negocio aquí.
// ============================================================

import React from 'react';
import Swal from 'sweetalert2';
import TablaGeneral from '../../shared/components/tabla/TablaGeneral';

const ListaAlumnos = ({ registros, columnas, loading, error, onEliminar }) => {

    const handleVer = (registro) => {
        Swal.fire({
            title: `${registro.nombre} ${registro.apellidos}`,
            html: `
                <div style="text-align:left;line-height:1.9">
                    <p><b>N° Control:</b> ${registro.control}</p>
                    <p><b>Carrera:</b> ${registro.carrera}</p>
                    <p><b>Teléfono:</b> ${registro.telefono}</p>
                    <p><b>Email:</b> ${registro.email}</p>
                </div>
            `,
            icon: 'info',
            confirmButtonColor: '#3b4cca'
        });
    };

    const handleEditar = (registro) => {
        Swal.fire({
            title: 'Editar Alumno',
            text: `Próximamente podrás editar a ${registro.nombre} ${registro.apellidos}.`,
            icon: 'warning',
            confirmButtonColor: '#3b4cca'
        });
    };

    // Eliminar: pide confirmación y, si acepta, delega al hook vía onEliminar
    const handleEliminar = (registro) => {
        Swal.fire({
            title: '¿Eliminar alumno?',
            text: `¿Seguro que deseas eliminar a ${registro.nombre} ${registro.apellidos}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#b91c1c',
            cancelButtonColor: '#3b4cca'
        }).then((result) => {
            if (result.isConfirmed) {
                onEliminar(registro.id); // elimina del estado real
                Swal.fire({
                    title: 'Eliminado',
                    text: `${registro.nombre} ${registro.apellidos} fue eliminado.`,
                    icon: 'success',
                    timer: 1800,
                    showConfirmButton: false
                });
            }
        });
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
