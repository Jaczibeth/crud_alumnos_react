import React from 'react';
import '@fontsource/inter';
import './tarjetaCristal.css';

const TarjetaCristal = ({ titulo, children }) => {
    return (
        <div className="tarjeta-cristal">
            {titulo && (
                <div className="tarjeta-cristal-titulo">
                    <span>{titulo}</span>
                </div>
            )}
            <div className="tarjeta-cristal-contenido">
                {children}
            </div>
        </div>
    );
};

export default TarjetaCristal;