import { useState } from "react"


import { useDocentes } from "../../core/hooks/useDocentes"
import Boton from "../../shared/components/botones/Botones"
import Alertas from "../../shared/components/alertas/Alertas"

const DocenteForm = () => {
  const { guardarDocente, loading, initialForm } = useDocentes()
  const [form, setForm] = useState(initialForm)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const res = await guardarDocente(form)

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
          <i className="bi bi-person-badge-fill"></i>
        </div>
        <div className="premium-header-content">
          <h1>Registrar Docente</h1>
          <p>Complete la información para dar de alta al docente</p>
        </div>
      </header>

      <div className="premium-form-body">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="row g-3">
            <div className="col-6">
              <label className="label-modern">
                <i className="bi bi-person-fill"></i> Nombre *
              </label>
              <input type="text" name="nombre" className="input-modern" placeholder="Ej: Juan Carlos" onChange={handleChange} />
            </div>
            <div className="col-6">
              <label className="label-modern">
                <i className="bi bi-person-vcard-fill"></i> Apellidos *
              </label>
              <input type="text" name="apellidos" className="input-modern" placeholder="Ej: Pérez González" onChange={handleChange} />
            </div>
            <div className="col-12">
              <label className="label-modern">
                <i className="bi bi-star-fill"></i> Especialidad *
              </label>
              <input type="text" name="especialidad" className="input-modern" placeholder="Ej: Ingeniería de Software" onChange={handleChange} />
            </div>
            <div className="col-12">
              <label className="label-modern">
                <i className="bi bi-credit-card-2-front-fill"></i> Cédula Profesional *
              </label>
              <input type="text" name="cedula" className="input-modern" placeholder="Ej: 12345678" onChange={handleChange} />
            </div>
            <div className="col-6">
              <label className="label-modern">
                <i className="bi bi-telephone-fill"></i> Teléfono *
              </label>
              <input type="tel" name="telefono" className="input-modern" placeholder="Ej: 953123456" onChange={handleChange} />
            </div>
            <div className="col-6">
              <label className="label-modern">
                <i className="bi bi-envelope-fill"></i> Email Institucional *
              </label>
              <input type="email" name="email" className="input-modern" placeholder="docente@tectlaxiaco.edu.mx" onChange={handleChange} />
            </div>
          </div>
          
          <div className="footer-modern">
            <Boton text="Registrar Docente" type="submit" loading={loading} />
          </div>
        </form>
      </div>
    </>
  )
}

export default DocenteForm