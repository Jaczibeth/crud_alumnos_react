export const validarMateria = (data) => {
  if (!data.nombre) return "El nombre es obligatorio"
  if (!data.clave) return "La clave es obligatoria"
  if (!data.semestre) return "Selecciona un semestre"
  if (!data.docenteId) return "Selecciona un docente"
  return null
}