import React from "react";
import ButtonRegister from "../../shared/components/botones/botones";
import { useMaterias } from "../../core/hooks/useMaterias";

const MateriaForm = () => {
    const { guardarMateria, form, errores, submitting, handleChange, semestres } = useMaterias();

    return (
        <>
            <header className="premium-form-header">
                <div className="premium-icon-circle">
                    <i className="bi bi-book-fill"></i>
                </div>
                <div className="premium-header-content">
                    <h1>Configurar Materia</h1>
                    <p>Complete la información para dar de alta la materia</p>
                </div>
            </header>

            <div className="premium-form-body">
                <form onSubmit={(e) => { e.preventDefault(); guardarMateria(); }}>
                    <div className="row g-3">
                        <div className="col-12">
                            <label className="label-modern">
                                <i className="bi bi-card-text"></i> Nombre de la Materia *
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                className={`input-modern ${errores.nombre ? 'input-error' : ''}`}
                                placeholder="Ej: Matemáticas"
                                value={form.nombre}
                                onChange={handleChange}
                            />
                            {errores.nombre && (
                                <span className="error-text">Nombre es obligatorio</span>
                            )}
                        </div>

                        <div className="col-6">
                            <label className="label-modern">
                                <i className="bi bi-star-fill"></i> Créditos *
                            </label>
                            <input
                                type="text"
                                name="creditos"
                                className={`input-modern ${errores.creditos ? 'input-error' : ''}`}
                                placeholder="1 a 5"
                                value={form.creditos}
                                onChange={handleChange}
                            />
                            {errores.creditos && (
                                <span className="error-text">Créditos debe ser entre 1 y 5</span>
                            )}
                        </div>

                        <div className="col-6">
                            <label className="label-modern">
                                <i className="bi bi-calendar3"></i> Semestre *
                            </label>
                            <select
                                name="semestre"
                                className={`select-modern ${errores.semestre ? 'input-error' : ''}`}
                                value={form.semestre}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione un semestre</option>
                                {semestres.length > 0 ? (
                                    semestres.map(s => (
                                        <option key={s.id} value={s.id}>{s.nombre}</option>
                                    ))
                                ) : (
                                    <option value="" disabled>No hay semestres registrados</option>
                                )}
                            </select>
                            {errores.semestre && (
                                <span className="error-text">Selecciona un semestre</span>
                            )}
                        </div>
                    </div>

                    <div className="footer-modern">
                        <ButtonRegister
                            type="submit"
                            text={submitting ? 'Registrando...' : 'Registrar Materia'}
                            disabled={submitting}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default MateriaForm;
