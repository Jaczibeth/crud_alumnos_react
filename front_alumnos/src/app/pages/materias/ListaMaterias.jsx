import React from 'react';
import Swal from 'sweetalert2';
import TablaGeneral from '../../shared/components/tabla/TablaGeneral';
import { useTablaMateria } from '../../core/hooks/useTablaMateria';
import { actualizarMateria, eliminarMateria } from '../../core/services/materias.service';

const ListaMaterias = () => {
    const { registros, columnas, loading, error, recargar } = useTablaMateria();

    const handleVer = (registro) => {
        Swal.fire({
            title: registro.nombre,
            html: `
                <div style="text-align:left;line-height:1.9">
                    <p><b>Créditos:</b> ${registro.creditos || 'N/A'}</p>
                    <p><b>Semestre:</b> ${registro.semestre_nombre || 'N/A'}</p>
                </div>
            `,
            icon: 'info',
            confirmButtonColor: '#3b4cca'
        });
    };

    const handleEditar = async (registro) => {
        const { value: formValues } = await Swal.fire({
            title: 'Editar Materia',
            html: `
                <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${registro.nombre || ''}">
                <input id="swal-creditos" class="swal2-input" placeholder="Créditos (1-5)" value="${registro.creditos || ''}" type="number" min="1" max="5">
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const nombre = document.getElementById('swal-nombre').value;
                const creditos = parseInt(document.getElementById('swal-creditos').value);

                if (!nombre.trim()) { Swal.showValidationMessage('El nombre es obligatorio'); return false; }
                if (creditos < 1 || creditos > 5) { Swal.showValidationMessage('Créditos debe ser entre 1 y 5'); return false; }

                return { nombre, creditos };
            }
        });

        if (formValues) {
            try {
                await actualizarMateria(registro.id, formValues);
                Swal.fire({
                    title: 'Actualizada',
                    text: `"${formValues.nombre}" fue actualizada.`,
                    icon: 'success',
                    timer: 1800,
                    showConfirmButton: false
                });
                if (recargar) recargar();
            } catch (err) {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo actualizar la materia.',
                    icon: 'error',
                    confirmButtonColor: '#d33'
                });
            }
        }
    };

    const handleEliminar = async (registro) => {
        const result = await Swal.fire({
            title: '¿Eliminar materia?',
            text: `¿Seguro que deseas eliminar "${registro.nombre}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#b91c1c',
            cancelButtonColor: '#3b4cca'
        });

        if (result.isConfirmed) {
            try {
                await eliminarMateria(registro.id);
                Swal.fire({
                    title: 'Eliminada',
                    text: `"${registro.nombre}" fue eliminada.`,
                    icon: 'success',
                    timer: 1800,
                    showConfirmButton: false
                });
                if (recargar) recargar();
            } catch (err) {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo eliminar la materia.',
                    icon: 'error',
                    confirmButtonColor: '#d33'
                });
            }
        }
    };

    return (
        <TablaGeneral
            titulo="Materias Registradas"
            icono="bi bi-book-fill"
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

export default ListaMaterias;
