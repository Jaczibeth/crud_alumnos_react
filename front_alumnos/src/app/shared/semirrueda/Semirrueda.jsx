import React from 'react';
import '@fontsource/inter';
import './semirrueda.css';

const Semirrueda = ({ datos = [] }) => {
    const total = datos.reduce((acc, item) => acc + item.valor, 0);
    let anguloAcumulado = 180;
    const colores = ['#3b4cca', '#5a6bff', '#7b8aff', '#9da9ff', '#bfc8ff'];

    return (
        <div className="semirrueda">
            <svg viewBox="0 0 200 120" className="semirrueda-svg">
                {datos.map((item, index) => {
                    const angulo = (item.valor / total) * 180;
                    const inicio = anguloAcumulado;
                    const fin = anguloAcumulado + angulo;
                    anguloAcumulado = fin;

                    const x1 = 100 + 80 * Math.cos((inicio * Math.PI) / 180);
                    const y1 = 80 + 80 * Math.sin((inicio * Math.PI) / 180);
                    const x2 = 100 + 80 * Math.cos((fin * Math.PI) / 180);
                    const y2 = 80 + 80 * Math.sin((fin * Math.PI) / 180);

                    const grandeArco = angulo > 180 ? 1 : 0;

                    return (
                        <path
                            key={index}
                            d={`M 100 80 L ${x1} ${y1} A 80 80 0 ${grandeArco} 1 ${x2} ${y2} Z`}
                            fill={colores[index % colores.length]}
                        />
                    );
                })}
            </svg>
            <div className="semirrueda-leyenda">
                {datos.map((item, index) => (
                    <div key={index} className="leyenda-item">
                        <span 
                            className="leyenda-color" 
                            style={{ backgroundColor: colores[index % colores.length] }}
                        />
                        <span className="leyenda-texto">{item.etiqueta}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Semirrueda;