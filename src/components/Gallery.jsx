import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import CursoCard from './CursoCard'
import api from '../services/api'

export default function Gallery() {
  const [cursos, setCursos] = useState([])

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await api.get('/api/cursos')
        setCursos(res.data)
      } catch (error) {
        console.error('Error al obtener los cursos:', error)
      }
    }

    fetchCursos()
  }, [])

  return (
    <div>
      <Row>
        {cursos.map((curso, i) => {
          return (
            <div key={i} className='col-md-4'>
              <CursoCard curso={curso} />
            </div>
          )
        })}
      </Row>
    </div>
  )
}
