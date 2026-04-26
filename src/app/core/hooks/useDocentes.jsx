import { useState } from "react"
import { crearDocente } from "../services/docentes.service"
import { validarDocente } from "../utils/validacionesDocente"
import { DocenteModel } from "../models/docente.model"

export const useDocentes = () => {
  const [loading, setLoading] = useState(false)

  const guardarDocente = async (data) => {
    const validationError = validarDocente(data)
    if (validationError) {
      return { error: validationError }
    }

    setLoading(true)
    try {
      await crearDocente(data)
      return { success: true }
    } catch {
      return { error: "Error al registrar" }
    } finally {
      setLoading(false)
    }
  }

  return { guardarDocente, loading, initialForm: DocenteModel }
}