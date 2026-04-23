import React, { useState } from 'react';
import ButtonRegister from '../../shared/components/botones/botones';
import Menu from '../../shared/components/menu/Menu';
import Swal from 'sweetalert2';
import { validarControl } from '../../core/utils/validacionesAlumno';
import './alumnos.css';

const Alumnos = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        carrera: '',
        control: '',
        telefono: '',
        email: '',
        urlFoto: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'telefono') {
            const val = value.replace(/\D/g, '').slice(0, 10);
            setFormData({ ...formData, [name]: val });
            return;
        }
        if (name === 'control') {
            const val = value.replace(/\D/g, '').slice(0, 8);
            setFormData({ ...formData, [name]: val });
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        Swal.fire({
            title: '¡Registrado!',
            text: 'Alumno registrado correctamente.',
            icon: 'success',
            confirmButtonColor: '#3b4cca'
        });
    };

    return (
        <div className="alumnos-app-layout">
            <Menu />
            
            <main className="alumnos-main-viewport">
                <div className="inner-view-card">
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
                            <div className="row g-4">
                                <div className="col-12">
                                    <label className="label-modern">
                                        <i className="bi bi-person-fill"></i> Nombre completo *
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        className="input-modern"
                                        placeholder="Ej: Juan Carlos Pérez"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="label-modern">
                                        <i className="bi bi-person-vcard-fill"></i> Apellidos *
                                    </label>
                                    <input
                                        type="text"
                                        name="apellidos"
                                        className="input-modern"
                                        placeholder="Ej: González Ramírez"
                                        value={formData.apellidos}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-12">
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
                                    <small className="hint-modern">10 dígitos (953...)</small>
                                </div>

                                <div className="col-12">
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
                            </div>

                            <div className="footer-modern mt-5">
                                <ButtonRegister 
                                    type="submit" 
                                    text="Registrar Alumno" 
                                    disabled={!validarControl(formData.control)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Alumnos;
