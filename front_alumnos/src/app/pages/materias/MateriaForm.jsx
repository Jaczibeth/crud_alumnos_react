import { useState } from "react"

import { useMaterias } from "../../core/hooks/useMaterias"
import Boton from "../../shared/components/botones/Botones"
import Alertas from "../../shared/components/alertas/Alertas"

const MateriaForm = () => {
  const { guardarMateria, loading, initialForm } = useMaterias()
  const [form, setForm] = useState(initialForm)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async () => {
    const res = await guardarMateria(form)

    if (res.error) {
      Alertas.error(res.error)
    } else {
      Alertas.success("Registro exitoso")
      setForm(initialForm)
    }
  }

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
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="row g-3">
            <div className="col-6">
              <label className="label-modern">
                <i className="bi bi-card-text"></i> Nombre de la Materia *
              </label>
              <input type="text" name="nombre" className="input-modern" placeholder="Ej: Matemáticas" onChange={handleChange} />
            </div>
            <div className="col-6">
              <label className="label-modern">
                <i className="bi bi-upc-scan"></i> Clave de Materia *
              </label>
              <input type="text" name="clave" className="input-modern" placeholder="Ej: MAT-101" onChange={handleChange} />
            </div>
            <div className="col-6">
              <label className="label-modern">
                <i className="bi bi-calendar3"></i> Semestre o Grado *
              </label>
              <select name="semestre" className="select-modern" onChange={handleChange}>
                <option value="">Seleccione un semestre</option>
                {[1,2,3,4,5,6,7,8,9].map(s => (
                  <option key={s} value={s}>{s}° Semestre</option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label className="label-modern">
                <i className="bi bi-person-video3"></i> Docente Asignado *
              </label>
              <select name="docenteId" className="select-modern" onChange={handleChange}>
                <option value="">Seleccione al Docente</option>
                <option value="1">Prof. Juan Carlos Pérez</option>
                <option value="2">Profa. María González</option>
              </select>
            </div>
          </div>
          
          <div className="footer-modern">
            <Boton text="Registrar Materia" type="submit" loading={loading} />
          </div>
        </form>
      </div>
    </>
  )
}

export default MateriaForm