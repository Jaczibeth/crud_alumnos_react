import React, { useState, useRef, useEffect } from 'react';
import './panelPeriodos.css';

const PanelPeriodos = ({ periodos, periodoActivo, onCambiarPeriodo }) => {
    const [indicador, setIndicador] = useState({ left: 0, width: 0 });
    const botonesRef = useRef({});
    const containerRef = useRef(null);

    useEffect(() => {
        if (botonesRef.current[periodoActivo] && containerRef.current) {
            const boton = botonesRef.current[periodoActivo];
            const container = containerRef.current;
            const containerLeft = container.getBoundingClientRect().left;
            const botonLeft = boton.getBoundingClientRect().left;
            
            setIndicador({
                left: botonLeft - containerLeft,
                width: boton.offsetWidth
            });
        }
    }, [periodoActivo]);

    const handleClick = (periodo) => {
        if (onCambiarPeriodo) {
            onCambiarPeriodo(periodo);
        }
    };

    return (
        <div className="panel-periodos" ref={containerRef}>
            <div className="panel-periodos-botones">
                {periodos.map((periodo) => (
                    <button
                        key={periodo.id}
                        ref={(el) => (botonesRef.current[periodo.id] = el)}
                        className={`boton-periodo ${periodoActivo === periodo.id ? 'activo' : ''}`}
                        onClick={() => handleClick(periodo.id)}
                    >
                        {periodo.etiqueta}
                    </button>
                ))}
            </div>
            <div 
                className="indicador-linea"
                style={{
                    transform: `translateX(${indicador.left}px)`,
                    width: `${indicador.width}px`
                }}
            />
        </div>
    );
};

export default PanelPeriodos;