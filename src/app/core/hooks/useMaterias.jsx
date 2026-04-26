import { useState } from "react"
import { crearMateria, verificarClave } from "../services/materias.service"
import { validarMateria } from "../utils/validacionesMateria"
import { MateriaModel } from "../models/materia.model"

export const useMaterias = () => {
  const [loading, setLoading] = useState(false)

  const guardarMateria = async (data) => {
    const validationError = validarMateria(data)
    if (validationError) return { error: validationError }

    setLoading(true)

    const existe = await verificarClave(data.clave)
    if (existe) {
      setLoading(false)
      return { error: "La clave ya existe" }
    }

    try {
      await crearMateria(data)
      return { success: true }
    } catch {
      return { error: "Error al guardar" }
    } finally {
      setLoading(false)
    }
  }

  return {
    guardarMateria,
    loading,
    initialForm: MateriaModel
  }
}