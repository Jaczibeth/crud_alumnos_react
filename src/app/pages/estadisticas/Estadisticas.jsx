import React, { useState } from 'react';
import '@fontsource/inter';
import PanelPeriodos from '../../shared/components/panelPeriodos/PanelPeriodos';
import TarjetaCristal from '../../shared/tarjetaCristal/TarjetaCristal';
import FilaEstadistica from '../../shared/filaEstadistica/FilaEstadistica';
import ChipConteo from '../../shared/chipConteo/ChipConteo';
import CirculoProgreso from '../../shared/circuloProgreso/CirculoProgreso';
import Semirrueda from '../../shared/semirrueda/Semirrueda';
import './estadisticas.css';

const periodos = [
    { id: '2024-2025', etiqueta: '2024-2025' },
    { id: '2025-2026', etiqueta: '2025-2026' },
    { id: '2026-2027', etiqueta: '2026-2027' },
    { id: 'primer-semestre', etiqueta: '1er Semestre' },
    { id: 'segundo-semestre', etiqueta: '2do Semestre' }
];

const datosSemirrueda = [
    { etiqueta: 'Matemáticas', valor: 35 },
    { etiqueta: 'Física', valor: 25 },
    { etiqueta: 'Química', valor: 20 },
    { etiqueta: 'Historia', valor: 15 },
    { etiqueta: 'Geografía', valor: 5 }
];

const Estadisticas = () => {
    const [periodoActivo, setPeriodoActivo] = useState('2025-2026');

    const handleCambiarPeriodo = (periodo) => {
        setPeriodoActivo(periodo);
    };

    return (
        <div className="estadisticas-container">
            <h1 className="page-title">Estadísticas</h1>
            <PanelPeriodos 
                periodos={periodos}
                periodoActivo={periodoActivo}
                onCambiarPeriodo={handleCambiarPeriodo}
            />
            <div className="tarjetas-grid">
                <TarjetaCristal titulo="Alumnos">
                    <FilaEstadistica icono="bi bi-mortarboard-fill" hora="09:00" nombre="Matemáticas" color="naranja" />
                    <FilaEstadistica icono="bi bi-mortarboard-fill" hora="10:30" nombre="Física" color="verde" />
                    <FilaEstadistica icono="bi bi-mortarboard-fill" hora="12:00" nombre="Química" color="rosa" />
                </TarjetaCristal>
                <TarjetaCristal titulo="Docentes">
                    <FilaEstadistica icono="bi bi-person-workspace" hora="08:00" nombre="Activo" color="verde" />
                    <FilaEstadistica icono="bi bi-person-workspace" hora="11:00" nombre="Permiso" color="naranja" />
                    <FilaEstadistica icono="bi bi-person-workspace" hora="14:00" nombre="Disponible" color="rosa" />
                </TarjetaCristal>
                <TarjetaCristal titulo="Materias">
                    <FilaEstadistica icono="bi bi-book" nombre="Matemáticas" color="naranja" />
                    <FilaEstadistica icono="bi bi-book" nombre="Física" color="verde" />
                    <FilaEstadistica icono="bi bi-book" nombre="Química" color="rosa" />
                    <FilaEstadistica icono="bi bi-book" nombre="Historia" color="morado" />
                    <FilaEstadistica icono="bi bi-book" nombre="Geografía" color="rosafuerte" />
                </TarjetaCristal>
            </div>
            <div className="chips-row">
                <div className="chip-con-item">
                    <ChipConteo numero="45" color="azul" />
                    <span>Asistencia</span>
                </div>
                <div className="chip-con-item">
                    <ChipConteo numero="12" color="verde" />
                    <span>Tareas</span>
                </div>
                <div className="chip-con-item">
                    <ChipConteo numero="8" color="naranja" />
                    <span>Exámenes</span>
                </div>
                <div className="chip-con-item">
                    <ChipConteo numero="3" color="rosa" />
                    <span>Proyectos</span>
                </div>
            </div>
            <div className="graficos-row">
                <TarjetaCristal titulo="Avance del Alumno">
                    <div className="avance-alumno">
                        <CirculoProgreso porcentaje={75} tamaño={140} />
                        <p className="avance-texto">75% Completado</p>
                    </div>
                </TarjetaCristal>
                <TarjetaCristal titulo="Distribución por Materia">
                    <Semirrueda datos={datosSemirrueda} />
                </TarjetaCristal>
            </div>
        </div>
    );
};

export default Estadisticas;