import { Row } from 'react-bootstrap'
import CursoCard from './CursoCard'

export default function Gallery({ cursos }) {
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
