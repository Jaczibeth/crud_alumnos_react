import React from 'react';
import '@fontsource/inter';
import './filaEstadistica.css';

const FilaEstadistica = ({ icono, hora, nombre, color }) => {
    return (
        <div className="fila-estadistica">
            <div className="fila-info">
                <div className="fila-icono">
                    <i className={icono || 'bi bi-mortarboard-fill'}></i>
                    <span>{hora || '00:00'}</span>
                </div>
                <div className="fila-nombre">
                    <span className={`badge-color badge-${color || 'naranja'}`}>
                        {nombre}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FilaEstadistica;