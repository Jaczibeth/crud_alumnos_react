import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Menu from '../../shared/components/menu/Menu';
import ButtonRegister from '../../shared/components/botones/botones';
import { useAlumnos } from '../../core/hooks/useAlumnos';
import { useAlumnoForm } from '../../core/hooks/useAlumnoForm';

import DocenteForm from '../docentes/DocenteForm';
import MateriaForm from '../materias/MateriaForm';

import ListaAlumnos from './ListaAlumnos';
import ListaDocentes from '../docentes/ListaDocentes';
import ListaMaterias from '../materias/ListaMaterias';
import Estadisticas from '../estadisticas/Estadisticas';

import './alumnos.css';

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

    const {
        registros,
        columnas,
        loading,
        error,
        agregarAlumno,
        recargar
    } = useAlumnos();

    const {
        formData,
        handleChange,
        handleSave,
        errores,
        submitting,
        getErrorText
    } = useAlumnoForm(INITIAL_ALUMNO, agregarAlumno);

    return (
        <div className="alumnos-app-layout">
            <Menu vista={vista} setVista={setVista} />

            <main className="alumnos-main-viewport">
                <div className="inner-view-card">

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
                                <form onSubmit={handleSave} noValidate>
                                    <div className="row g-3">
                                        <div className="col-6">
                                            <label className="label-modern">
                                                <i className="bi bi-person-fill"></i> Nombre *
                                            </label>
                                            <input
                                                type="text"
                                                name="nombre"
                                                className={`input-modern ${errores.nombre ? 'input-error' : ''}`}
                                                placeholder="Ej: Juan Carlos"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                            />
                                            {errores.nombre && (
                                                <span className="error-text">{getErrorText('nombre')}</span>
                                            )}
                                        </div>

                                        <div className="col-6">
                                            <label className="label-modern">
                                                <i className="bi bi-person-vcard-fill"></i> Apellidos *
                                            </label>
                                            <input
                                                type="text"
                                                name="apellidos"
                                                className={`input-modern ${errores.apellidos ? 'input-error' : ''}`}
                                                placeholder="Ej: Pérez González"
                                                value={formData.apellidos}
                                                onChange={handleChange}
                                            />
                                            {errores.apellidos && (
                                                <span className="error-text">{getErrorText('apellidos')}</span>
                                            )}
                                        </div>

                                        <div className="col-6">
                                            <label className="label-modern">
                                                <i className="bi bi-mortarboard-fill"></i> Carrera *
                                            </label>
                                            <select
                                                name="carrera"
                                                className={`select-modern ${errores.carrera ? 'input-error' : ''}`}
                                                value={formData.carrera}
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled>Seleccione carrera</option>
                                                <option value="Ingeniería">Ingeniería</option>
                                                <option value="Licenciatura">Licenciatura</option>
                                            </select>
                                            {errores.carrera && (
                                                <span className="error-text">{getErrorText('carrera')}</span>
                                            )}
                                        </div>

                                        <div className="col-6">
                                            <label className="label-modern">
                                                <i className="bi bi-qr-code-scan"></i> Control *
                                            </label>
                                            <input
                                                type="text"
                                                name="control"
                                                className={`input-modern ${errores.control ? 'input-error' : ''}`}
                                                placeholder="Ej: 22620233"
                                                value={formData.control}
                                                onChange={handleChange}
                                            />
                                            <small className="hint-modern">8 dígitos numéricos</small>
                                            {errores.control && (
                                                <span className="error-text">{getErrorText('control')}</span>
                                            )}
                                        </div>

                                        <div className="col-6">
                                            <label className="label-modern">
                                                <i className="bi bi-telephone-fill"></i> Teléfono *
                                            </label>
                                            <input
                                                type="tel"
                                                name="telefono"
                                                className={`input-modern ${errores.telefono ? 'input-error' : ''}`}
                                                placeholder="Ej: 953123456"
                                                value={formData.telefono}
                                                onChange={handleChange}
                                            />
                                            {errores.telefono && (
                                                <span className="error-text">{getErrorText('telefono')}</span>
                                            )}
                                        </div>

                                        <div className="col-6">
                                            <label className="label-modern">
                                                <i className="bi bi-envelope-fill"></i> Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                className={`input-modern ${errores.email ? 'input-error' : ''}`}
                                                placeholder="alumno@gmail.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            {errores.email && (
                                                <span className="error-text">{getErrorText('email')}</span>
                                            )}
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
                                            text={submitting ? 'Registrando...' : 'Registrar Alumno'}
                                            disabled={submitting}
                                        />
                                    </div>
                                </form>
                            </div>
                        </>
                    )}

                    {vista === 'docentes' && <DocenteForm />}
                    {vista === 'materias' && <MateriaForm />}

                    {vista === 'lista-alumnos' && (
                        <ListaAlumnos
                            registros={registros}
                            columnas={columnas}
                            loading={loading}
                            error={error}
                            recargar={recargar}
                        />
                    )}
                    {vista === 'lista-docentes' && <ListaDocentes />}
                    {vista === 'lista-materias' && <ListaMaterias />}

                    {vista === 'estadisticas' && <Estadisticas />}

                </div>
            </main>
        </div>
    );
};

export default Alumnos;
