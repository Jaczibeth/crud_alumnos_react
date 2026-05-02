import React from "react";
import Swal from "sweetalert2";
import ButtonRegister from "../../shared/components/botones/botones";
import { useDocentes } from "../../core/hooks/useDocentes";

const DocenteForm = () => {
    const { guardarDocente, form, errores, submitting, handleChange } = useDocentes();

    return (
        <>
            <header className="premium-form-header">
                <div className="premium-icon-circle">
                    <i className="bi bi-person-badge-fill"></i>
                </div>
                <div className="premium-header-content">
                    <h1>Registrar Docente</h1>
                    <p>Complete la información para dar de alta al docente</p>
                </div>
            </header>

            <div className="premium-form-body">
                <form onSubmit={(e) => { e.preventDefault(); guardarDocente(); }}>
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
                                value={form.nombre}
                                onChange={handleChange}
                            />
                            {errores.nombre && (
                                <span className="error-text">Solo se permiten letras</span>
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
                                value={form.apellidos}
                                onChange={handleChange}
                            />
                            {errores.apellidos && (
                                <span className="error-text">Solo se permiten letras</span>
                            )}
                        </div>

                        <div className="col-12">
                            <label className="label-modern">
                                <i className="bi bi-star-fill"></i> Especialidad *
                            </label>
                            <input
                                type="text"
                                name="especialidad"
                                className={`input-modern ${errores.especialidad ? 'input-error' : ''}`}
                                placeholder="Ej: Ingeniería de Software"
                                value={form.especialidad}
                                onChange={handleChange}
                            />
                            {errores.especialidad && (
                                <span className="error-text">Especialidad es obligatoria</span>
                            )}
                        </div>

                        <div className="col-12">
                            <label className="label-modern">
                                <i className="bi bi-credit-card-2-front-fill"></i> Cédula Profesional *
                            </label>
                            <input
                                type="text"
                                name="cedula"
                                className={`input-modern ${errores.cedula ? 'input-error' : ''}`}
                                placeholder="Ej: 12345678"
                                value={form.cedula}
                                onChange={handleChange}
                            />
                            {errores.cedula && (
                                <span className="error-text">Exactamente 8 dígitos numéricos</span>
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
                                placeholder="Ej: 9531234567"
                                value={form.telefono}
                                onChange={handleChange}
                            />
                            {errores.telefono && (
                                <span className="error-text">Debe iniciar con 953, 951 o 55</span>
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
                                placeholder="docente@tectlaxiaco.edu.mx"
                                value={form.email}
                                onChange={handleChange}
                            />
                            {errores.email && (
                                <span className="error-text">Formato de correo no válido</span>
                            )}
                        </div>
                    </div>

                    <div className="footer-modern">
                        <ButtonRegister
                            type="submit"
                            text={submitting ? 'Registrando...' : 'Registrar Docente'}
                            disabled={submitting}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default DocenteForm;
