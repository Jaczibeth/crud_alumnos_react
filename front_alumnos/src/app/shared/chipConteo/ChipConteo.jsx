import React from 'react';
import '@fontsource/inter';
import './chipConteo.css';

const ChipConteo = ({ numero, color = 'azul' }) => {
    return (
        <div className={`chip-conteo chip-${color}`}>
            <span>{numero}</span>
        </div>
    );
};

export default ChipConteo;