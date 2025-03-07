import { createContext, useEffect, useState } from 'react'
import api from '../services/api'

export const CursosContext = createContext()

const CursosProvider = ({ children }) => {
  const [cursos, setCursos] = useState([])

  const getCursos = async () => {
    try {
      const res = await api.get('/api/cursos')
      console.log('Cursos cargados:', res.data) // Mensaje de depuración
      setCursos(res.data)
    } catch (error) {
      console.log('Error al obtener los cursos:', error)
    }
  }

  const postCurso = async (curso) => {
    try {
      const res = await api.post('/api/cursos', curso)
      setCursos([...cursos, res.data])
    } catch (error) {
      console.error('Error al crear el curso:', error)
    }
  }

  const putCurso = async (id, cursoActualizado) => {
    try {
      const res = await api.put(`/api/cursos/${id}`, cursoActualizado)
      setCursos(
        cursos.map((curso) => (curso.id === id ? res.data : curso))
      )
    } catch (error) {
      console.error('Error al editar el curso:', error)
    }
  }

  const deleteCurso = async (id) => {
    try {
      await api.delete(`/api/cursos/${id}`)
      setCursos(cursos.filter((curso) => curso.id !== id))
    } catch (error) {
      console.error('Error al eliminar el curso:', error)
    }
  }

  useEffect(() => {
    getCursos()
  }, [])

  return (
    <CursosContext.Provider value={{ cursos, postCurso, putCurso, deleteCurso }}>
      {children}
    </CursosContext.Provider>
  )
}

export default CursosProvider
