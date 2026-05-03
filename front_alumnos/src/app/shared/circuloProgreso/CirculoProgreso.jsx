import React from 'react';
import '@fontsource/inter';
import './circuloProgreso.css';

const CirculoProgreso = ({ porcentaje = 0, tamaño = 100, color = 'azul' }) => {
    const radio = (tamaño - 8) / 2;
    const circunferencia = 2 * Math.PI * radio;
    const progreso = (porcentaje / 100) * circunferencia;

    return (
        <div className="circulo-progreso" style={{ width: tamaño, height: tamaño }}>
            <svg width={tamaño} height={tamaño} viewBox={`0 0 ${tamaño} ${tamaño}`}>
                <circle
                    className="circulo-fondo"
                    cx={tamaño / 2}
                    cy={tamaño / 2}
                    r={radio}
                    fill="none"
                    strokeWidth="6"
                />
                <circle
                    className={`circulo-barrita circulo-${color}`}
                    cx={tamaño / 2}
                    cy={tamaño / 2}
                    r={radio}
                    fill="none"
                    strokeWidth="6"
                    strokeDasharray={circunferencia}
                    strokeDashoffset={circunferencia - progreso}
                    transform={`rotate(-90 ${tamaño / 2} ${tamaño / 2})`}
                />
            </svg>
            <div className="circulo-texto">
                <span>{porcentaje}</span>
            </div>
        </div>
    );
};

export default CirculoProgreso;