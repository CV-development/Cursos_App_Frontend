import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const CursosContext = createContext()

const CursosProvider = ({ children }) => {
  const [cursos, setCursos] = useState([])

  const getCursos = async () => {
    try {
      const res = await axios.get('../demo/Cursos.json')
      setCursos(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCursos()
  }, [])

  console.log(cursos)

  return (
    <CursosContext.Provider value={{ cursos }}>
      {children}
    </CursosContext.Provider>
  )
}

export default CursosProvider
