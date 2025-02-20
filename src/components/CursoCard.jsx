import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

function CursoCard({ curso }) {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = () => {
    const idUsuario = "1" // Se debe reemplazar con la lógica del provider cuando esté listo

    addToCart(curso.id, idUsuario) // Llama a la función para agregar al carrito

    alert(`Curso "${curso.titulo}" agregado al carro`)
  }

  return (
    <Card bg="primary" text="white" style={{ width: '18rem' }} className="m-4">
      <Card.Body>
        <Link to={`/curso/${curso.id}`}>
          <Card.Title style={{ color: 'white' }}>{curso.titulo}</Card.Title>
        </Link>
        <Card.Text>Descripción: {curso.descripcion}</Card.Text>
        <Card.Text>
          <b>Instructor:</b> {curso.instructor}
        </Card.Text>
        <Card.Text>
          <b>Precio: </b> {curso.precio}
        </Card.Text>
        <Button variant="light" onClick={handleAddToCart}>
          Agregar al Carro
        </Button>
      </Card.Body>
    </Card>
  )
}

export default CursoCard
