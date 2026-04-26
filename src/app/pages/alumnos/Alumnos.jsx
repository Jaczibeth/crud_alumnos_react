// ============================================================
// Alumnos.jsx
// Capa 1 – Presentación: layout principal de la aplicación.
// Usa useAlumnos() como fuente de verdad compartida y pasa
// agregarAlumno al form y registros/eliminarAlumno a la tabla.
// Sin lógica de negocio aquí.
// ============================================================

import React, { useState } from 'react';
import Menu from '../../shared/components/menu/Menu';
import ButtonRegister from '../../shared/components/botones/botones';
import { useAlumnos } from '../../core/hooks/useAlumnos';
import { useAlumnoForm } from '../../core/hooks/useAlumnoForm';

// Formularios de registro
import DocenteForm from '../docentes/DocenteForm';
import MateriaForm from '../materias/MateriaForm';

// Vistas de tabla
import ListaAlumnos from './ListaAlumnos';
import ListaDocentes from '../docentes/ListaDocentes';
import ListaMaterias from '../materias/ListaMaterias';

import './alumnos.css';

// Estado vacío del formulario definido fuera del componente (es una constante)
const INITIAL_ALUMNO = {
    nombre: '',
    apellidos: '',
    carrera: '',
    control: '',
    telefono: '',
    email: '',
    urlFoto: ''
};

const Alumnos = () => {
    const [vista, setVista] = useState('alumnos');

    // ── Capa de aplicación: estado compartido de la lista de alumnos ──
    const {
        registros,
        columnas,
        loading,
        error,
        agregarAlumno,
        eliminarAlumno
    } = useAlumnos();

    // ── Capa de aplicación: lógica del formulario ──
    // Se inyecta agregarAlumno para que al guardar actualice la lista
    const { formData, handleChange, handleSave, isValid } = useAlumnoForm(
        INITIAL_ALUMNO,
        agregarAlumno
    );

    return (
        <div className="alumnos-app-layout">
            <Menu vista={vista} setVista={setVista} />

            <main className="alumnos-main-viewport">
                <div className="inner-view-card">

                    {/* ── Formulario: Registro Alumno ── */}
                    {vista === 'alumnos' && (
                        <>
                            <header className="premium-form-header">
                                <div className="premium-icon-circle">
                                    <i className="bi bi-person-plus-fill"></i>
                                </div>
                                <div className="premium-header-content">
                                    <h1>Registrar Alumno</h1>
                                    <p>Complete la información para dar de alta al estudiante</p>
                                </div>
                            </header>

                            <div className="premium-form-body">
                                <form onSubmit={handleSave}>
                                    <div className="row g-3">
                                        <div className="col-6">
                                            <label className="label-modern">
                                                <i className="bi bi-person-fill"></i> Nombre *
                                            </label>
                                            <input
                                                type="text"
                                                name="nombre"
                                                className="input-modern"
                                                placeholder="Ej: Juan Carlos"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-6">
                                            <label className="label-modern">
                                                <i className="bi bi-person-vcard-fill"></i> Apellidos *
                                            </label>
                                            <input
                                                type="text"
                                                name="apellidos"
                                                className="input-modern"
                                                placeholder="Ej: Pérez González"
                                                value={formData.apellidos}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-6">
                                            <label className="label-modern">
                                                <i className="bi bi-mortarboard-fill"></i> Carrera *
                                            </label>
                                            <select
                                                name="carrera"
                                                className="select-modern"
                                                value={formData.carrera}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="" disabled>Seleccione carrera</option>
                                                <option value="Ingeniería">Ingeniería</option>
                                                <option value="Licenciatura">Licenciatura</option>
                                            </select>
                                        </div>

                                        <div className="col-6">
                                            <label className="label-modern">
                                                <i className="bi bi-qr-code-scan"></i> Control *
                                            </label>
                                            <input
                                                type="text"
                                                name="control"
                                                className="input-modern"
                                                placeholder="Ej: 22620233"
                                                value={formData.control}
                                                onChange={handleChange}
                                                required
                                            />
                                            <small className="hint-modern">8 dígitos numéricos</small>
                                        </div>

                                        <div className="col-6">
                                            <label className="label-modern">
                                                <i className="bi bi-telephone-fill"></i> Teléfono *
                                            </label>
                                            <input
                                                type="tel"
                                                name="telefono"
                                                className="input-modern"
                                                placeholder="Ej: 953123456"
                                                value={formData.telefono}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-6">
                                            <label className="label-modern">
                                                <i className="bi bi-envelope-fill"></i> Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="input-modern"
                                                placeholder="alumno@gmail.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-12">
                                            <div className="image-preview-wrapper">
                                                <div className="flex-grow-1">
                                                    <label className="label-modern">
                                                        <i className="bi bi-image-fill"></i> URL Fotografía
                                                    </label>
                                                    <input
                                                        type="url"
                                                        name="urlFoto"
                                                        className="input-modern"
                                                        placeholder="https://ejemplo.com/foto.jpg"
                                                        value={formData.urlFoto}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="image-preview-container">
                                                    {formData.urlFoto ? (
                                                        <img
                                                            src={formData.urlFoto}
                                                            alt="Preview"
                                                            onError={(e) => e.target.src = 'https://via.placeholder.com/60?text=Error'}
                                                        />
                                                    ) : (
                                                        <div className="no-image-placeholder">
                                                            <i className="bi bi-image"></i>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="footer-modern">
                                        <ButtonRegister
                                            type="submit"
                                            text="Registrar Alumno"
                                            disabled={!isValid}
                                        />
                                    </div>
                                </form>
                            </div>
                        </>
                    )}

                    {/* ── Formularios de registro: Docente y Materia ── */}
                    {vista === 'docentes' && <DocenteForm />}
                    {vista === 'materias' && <MateriaForm />}

                    {/* ── Tablas de consulta ──
                        ListaAlumnos recibe el estado compartido (registros, eliminarAlumno)
                        para que form y tabla estén sincronizados en tiempo real.         */}
                    {vista === 'lista-alumnos' && (
                        <ListaAlumnos
                            registros={registros}
                            columnas={columnas}
                            loading={loading}
                            error={error}
                            onEliminar={eliminarAlumno}
                        />
                    )}
                    {vista === 'lista-docentes' && <ListaDocentes />}
                    {vista === 'lista-materias' && <ListaMaterias />}

                </div>
            </main>
        </div>
    );
};

export default Alumnos;
