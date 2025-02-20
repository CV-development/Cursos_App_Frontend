import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const CursosContext = createContext()

const CursosProvider = ({ children }) => {
  const [cursos, setCursos] = useState([])
  const URL = '../demo/Cursos.json'

  const getCursos = async () => {
    try {
      const res = await axios.get(URL)
      setCursos(res.data)
    } catch (error) {
      console.log('Error al obtener los cursos:', error)
    }
  }

  const postCurso = async (curso) => {
    try {
      const res = await axios.post(URL)
      setCursos([...cursos, res.data])
    } catch (error) {
      console.error('Error al crear el curso:', error)
    }
  }

  const putCurso = async (id, cursoActualizado) => {
    try {
      const res = await axios.put(URL, cursos.map((curso) => (curso.id === id ? cursoActualizado : curso)))
      setCursos(
        cursos.map((curso) => (curso.id === id ? cursoActualizado : curso))
      )
    } catch (error) {
      console.error('Error al editar el curso:', error)
    }
  }

  const deleteCurso = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`)
      setCursos(cursos.filter((curso) => curso.id !== id))
    } catch (error) {
      console.error('Error al eliminar el curso:', error)
    }
  }

  useEffect(() => {
    getCursos()
  }, [])

  console.log(cursos)

  return (
    <CursosContext.Provider value={{ cursos, postCurso, putCurso, deleteCurso }}>
      {children}
    </CursosContext.Provider>
  )
}

export default CursosProvider
