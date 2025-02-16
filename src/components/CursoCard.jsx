import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

function CursoCard ({ curso }) {
  return (
    <Link to={`/curso/${curso.id}`}>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{curso.titulo}</Card.Title>
          <Card.Text>{curso.descripcion}</Card.Text>
          <Button variant='primary'>Comprar</Button>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default CursoCard
