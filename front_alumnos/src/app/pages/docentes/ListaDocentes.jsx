import React from 'react';
import Swal from 'sweetalert2';
import TablaGeneral from '../../shared/components/tabla/TablaGeneral';
import { useTablaDocentes } from '../../core/hooks/useTablaDocentes';
import { actualizarDocente, eliminarDocente, obtenerDocentes } from '../../core/services/docentes.service';

const validarSoloLetras = (v) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(v.trim());
const validarCedula = (v) => /^\d{8}$/.test(v.trim());
const validarTelefono = (v) => {
    if (!/^\d{10}$/.test(v)) return false;
    return v.startsWith('953') || v.startsWith('951') || v.startsWith('55');
};
const validarEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const ListaDocentes = () => {
    const { registros, columnas, loading, error, recargar } = useTablaDocentes();

    const handleVer = (registro) => {
        Swal.fire({
            title: `${registro.nombre} ${registro.apellidos}`,
            html: `
                <div style="text-align:left;line-height:1.9">
                    <p><b>Cédula:</b> ${registro.cedula || 'N/A'}</p>
                    <p><b>Especialidad:</b> ${registro.especialidad || 'N/A'}</p>
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
            title: 'Editar Docente',
            html: `
                <input id="swal-nombre" class="swal2-input" placeholder="Nombre (solo letras)" value="${registro.nombre || ''}">
                <input id="swal-apellidos" class="swal2-input" placeholder="Apellidos (solo letras)" value="${registro.apellidos || ''}">
                <input id="swal-especialidad" class="swal2-input" placeholder="Especialidad" value="${registro.especialidad || ''}">
                <input id="swal-cedula" class="swal2-input" placeholder="Cédula (8 dígitos)" value="${registro.cedula || ''}">
                <input id="swal-telefono" class="swal2-input" placeholder="Teléfono (10 dígitos)" value="${registro.telefono || ''}">
                <input id="swal-email" class="swal2-input" placeholder="Email" value="${registro.email || ''}">
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const nombre = document.getElementById('swal-nombre').value;
                const apellidos = document.getElementById('swal-apellidos').value;
                const especialidad = document.getElementById('swal-especialidad').value;
                const cedula = document.getElementById('swal-cedula').value;
                const telefono = document.getElementById('swal-telefono').value;
                const email = document.getElementById('swal-email').value;

                if (!validarSoloLetras(nombre)) { Swal.showValidationMessage('Nombre solo debe contener letras'); return false; }
                if (!validarSoloLetras(apellidos)) { Swal.showValidationMessage('Apellidos solo deben contener letras'); return false; }
                if (!especialidad.trim()) { Swal.showValidationMessage('Especialidad es obligatoria'); return false; }
                if (!validarCedula(cedula)) { Swal.showValidationMessage('Cédula: exactamente 8 dígitos numéricos'); return false; }
                if (!validarTelefono(telefono)) { Swal.showValidationMessage('Teléfono: 10 dígitos, inicio 953/951/55'); return false; }
                if (!validarEmail(email)) { Swal.showValidationMessage('Formato de correo no válido'); return false; }

                return { nombre, apellidos, especialidad, cedula, telefono, email };
            }
        });

        if (formValues) {
            try {
                const existentes = await obtenerDocentes();
                const otroCedula = existentes.some((d) => d.cedula?.trim() === formValues.cedula.trim() && d.id !== registro.id);
                const otroTelefono = existentes.some((d) => d.telefono?.trim() === formValues.telefono.trim() && d.id !== registro.id);
                const otroEmail = existentes.some((d) => d.email?.trim() === formValues.email.trim() && d.id !== registro.id);

                if (otroCedula) { Swal.fire({ icon: 'error', title: 'Duplicado', text: 'La cédula ya está registrada', confirmButtonColor: '#d33' }); return; }
                if (otroTelefono) { Swal.fire({ icon: 'error', title: 'Duplicado', text: 'El teléfono ya está registrado', confirmButtonColor: '#d33' }); return; }
                if (otroEmail) { Swal.fire({ icon: 'error', title: 'Duplicado', text: 'El email ya está registrado', confirmButtonColor: '#d33' }); return; }

                await actualizarDocente(registro.id, formValues);
                Swal.fire({ title: 'Actualizado', text: `${formValues.nombre} fue actualizado.`, icon: 'success', timer: 1800, showConfirmButton: false });
                if (recargar) recargar();
            } catch (err) {
                Swal.fire({ title: 'Error', text: 'No se pudo actualizar el docente.', icon: 'error', confirmButtonColor: '#d33' });
            }
        }
    };

    const handleEliminar = async (registro) => {
        const result = await Swal.fire({
            title: '¿Eliminar docente?',
            text: `¿Seguro que deseas eliminar a ${registro.nombre} ${registro.apellidos}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#b91c1c',
            cancelButtonColor: '#3b4cca'
        });

        if (result.isConfirmed) {
            try {
                await eliminarDocente(registro.id);
                Swal.fire({ title: 'Eliminado', text: `${registro.nombre} ${registro.apellidos} fue eliminado.`, icon: 'success', timer: 1800, showConfirmButton: false });
                if (recargar) recargar();
            } catch (err) {
                Swal.fire({ title: 'Error', text: 'No se pudo eliminar el docente.', icon: 'error', confirmButtonColor: '#d33' });
            }
        }
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
