

import React from 'react';
import './tabla.css';


const obtenerClaseBadge = (key, valor) => {
    if (!valor) return 'badge-default';

    const v = String(valor).toLowerCase().replace(/\s+/g, '');

   
    if (key === 'carrera') {
        if (v.includes('ingenieria') || v.includes('ingeniería')) return 'badge-ingenieria';
        if (v.includes('licenciatura')) return 'badge-licenciatura';
    }

   
    if (key === 'semestre') {
        return `badge-semestre-${v}`;
    }

    return 'badge-default';
};


const CeldaDato = ({ columna, valor }) => {
    if (columna.tipo === 'badge') {
        const clase = obtenerClaseBadge(columna.key, valor);
        return (
            <span className={`tabla-badge ${clase}`}>
                {valor}
            </span>
        );
    }
    return <span>{valor ?? '—'}</span>;
};


const FilaTabla = ({ registro, columnas, onVer, onEditar, onEliminar }) => (
    <tr>
        {columnas.map((col) => (
            <td key={col.key}>
                <CeldaDato columna={col} valor={registro[col.key]} />
            </td>
        ))}
        <td className="tabla-col-acciones">
            <button
                id={`btn-ver-${registro.id}`}
                className="btn-accion btn-ver"
                onClick={() => onVer(registro)}
                title="Ver detalle"
            >
                <i className="bi bi-eye-fill"></i> Ver
            </button>
            <button
                id={`btn-editar-${registro.id}`}
                className="btn-accion btn-editar"
                onClick={() => onEditar(registro)}
                title="Editar registro"
            >
                <i className="bi bi-pencil-fill"></i> Editar
            </button>
            <button
                id={`btn-eliminar-${registro.id}`}
                className="btn-accion btn-eliminar"
                onClick={() => onEliminar(registro)}
                title="Eliminar registro"
            >
                <i className="bi bi-trash3-fill"></i> Eliminar
            </button>
        </td>
    </tr>
);


const TablaGeneral = ({
    titulo,
    icono,
    columnas = [],
    registros = [],
    loading = false,
    error = null,
    onVer,
    onEditar,
    onEliminar
}) => {
    return (
        <div className="tabla-glass-container">

           
            <div className="tabla-header">
                <div className="tabla-header-icon">
                    <i className={icono}></i>
                </div>
                <div className="tabla-header-text">
                    <h2>{titulo}</h2>
                    <p>{registros.length} registro{registros.length !== 1 ? 's' : ''} encontrado{registros.length !== 1 ? 's' : ''}</p>
                </div>
            </div>

           
            {error && (
                <div className="tabla-error">
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    {error}
                </div>
            )}

          
            {loading && (
                <div className="tabla-loading">
                    <div className="tabla-loading-spinner"></div>
                    <span>Cargando registros…</span>
                </div>
            )}

          
            {!loading && !error && registros.length === 0 && (
                <div className="tabla-vacia">
                    <i className="bi bi-inbox"></i>
                    <p>No hay registros para mostrar</p>
                </div>
            )}

          
            {!loading && !error && registros.length > 0 && (
                <div className="tabla-scroll-wrapper">
                    <table className="tabla-base">
                        <thead>
                            <tr>
                               
                                {columnas.map((col) => (
                                    <th key={col.key}>{col.label}</th>
                                ))}
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                            {registros.map((registro) => (
                                <FilaTabla
                                    key={registro.id}
                                    registro={registro}
                                    columnas={columnas}
                                    onVer={onVer}
                                    onEditar={onEditar}
                                    onEliminar={onEliminar}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default TablaGeneral;
