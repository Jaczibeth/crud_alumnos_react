
import React from 'react';
import Swal from 'sweetalert2';
import TablaGeneral from '../../shared/components/tabla/TablaGeneral';
import { useTablaMateria } from '../../core/hooks/useTablaMateria';

const ListaMaterias = () => {
    const { registros, columnas, loading, error, eliminarMateria } = useTablaMateria();

    const handleVer = (registro) => {
        Swal.fire({
            title: registro.nombre,
            html: `
                <div style="text-align:left;line-height:1.9">
                    <p><b>Clave:</b> ${registro.clave}</p>
                    <p><b>Semestre:</b> ${registro.semestre}°</p>
                    <p><b>Docente:</b> ${registro.docenteId}</p>
                </div>
            `,
            icon: 'info',
            confirmButtonColor: '#3b4cca'
        });
    };

    const handleEditar = (registro) => {
        Swal.fire({
            title: 'Editar Materia',
            text: `Próximamente podrás editar "${registro.nombre}".`,
            icon: 'warning',
            confirmButtonColor: '#3b4cca'
        });
    };

    // Eliminar: pide confirmación y llama a eliminarMateria del hook
    const handleEliminar = (registro) => {
        Swal.fire({
            title: '¿Eliminar materia?',
            text: `¿Seguro que deseas eliminar "${registro.nombre}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#b91c1c',
            cancelButtonColor: '#3b4cca'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarMateria(registro.id);
                Swal.fire({
                    title: 'Eliminada',
                    text: `"${registro.nombre}" fue eliminada.`,
                    icon: 'success',
                    timer: 1800,
                    showConfirmButton: false
                });
            }
        });
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
