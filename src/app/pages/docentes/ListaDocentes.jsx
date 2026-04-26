// ============================================================
// ListaDocentes.jsx
// Capa 1 – Presentación: vista de tabla de docentes.
// Usa useTablaDocentes para obtener datos y eliminarDocente.
// No contiene lógica de negocio.
// ============================================================

import React from 'react';
import Swal from 'sweetalert2';
import TablaGeneral from '../../shared/components/tabla/TablaGeneral';
import { useTablaDocentes } from '../../core/hooks/useTablaDocentes';

const ListaDocentes = () => {
    const { registros, columnas, loading, error, eliminarDocente } = useTablaDocentes();

    const handleVer = (registro) => {
        Swal.fire({
            title: `${registro.nombre} ${registro.apellidos}`,
            html: `
                <div style="text-align:left;line-height:1.9">
                    <p><b>Cédula:</b> ${registro.cedula}</p>
                    <p><b>Especialidad:</b> ${registro.especialidad}</p>
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
            title: 'Editar Docente',
            text: `Próximamente podrás editar a ${registro.nombre} ${registro.apellidos}.`,
            icon: 'warning',
            confirmButtonColor: '#3b4cca'
        });
    };

    // Eliminar: pide confirmación y llama a eliminarDocente del hook
    const handleEliminar = (registro) => {
        Swal.fire({
            title: '¿Eliminar docente?',
            text: `¿Seguro que deseas eliminar a ${registro.nombre} ${registro.apellidos}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#b91c1c',
            cancelButtonColor: '#3b4cca'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarDocente(registro.id);
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
            titulo="Docentes Registrados"
            icono="bi bi-person-workspace"
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

export default ListaDocentes;
