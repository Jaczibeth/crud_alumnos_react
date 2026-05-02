export const validarDocente = (data) => {
  if (!data.nombre) return "Nombre requerido";
  if (!data.apellidos) return "Apellidos requeridos";
  if (!data.especialidad) return "Especialidad requerida";
  if (!data.cedula) return "Cédula profesional requerida";
  if (!data.telefono) return "Teléfono requerido";
  if (!data.email) return "Email requerido";

  const regex = /^[a-zA-Z0-9._%+-]+@tectlaxiaco\.edu\.mx$/;
  if (!regex.test(data.email)) {
    return "El email debe ser institucional (@tectlaxiaco.edu.mx)";
  }

  return null;
}