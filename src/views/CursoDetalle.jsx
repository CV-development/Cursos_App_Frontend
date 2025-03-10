import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import React, { useContext } from 'react'
import { CursosContext } from '../context/CursosContext'
import { useParams } from 'react-router-dom'
import CursoCard from '../components/CursoCard'

export default function CursoDetalle() {
  const { cursos, loading, error } = useContext(CursosContext)
  let { cursoId } = useParams()
  const cursoIdNumber = parseInt(cursoId, 10)

  if (loading) {
    return <p>Cargando curso...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  const curso = cursos.find(curso => curso.id === cursoIdNumber)

  if (!curso) {
    return <p>Curso no encontrado</p>
  }

  return (
    <div>
      <NavBar />
      <CursoCard curso={curso} />
      <Footer />
    </div>
  )
}
