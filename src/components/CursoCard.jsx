import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext'
import api from '../services/api'
import './CursoCard.css' // Import the CSS file for custom styles

function CursoCard({ curso }) {
  const { addToCart } = useContext(CartContext)
  const [cursoData, setCursoData] = useState(null)

  useEffect(() => {
    const fetchCursoData = async () => {
      try {
        const res = await api.get(`/api/cursos/${curso.id}`)
        setCursoData(res.data)
      } catch (error) {
        console.error('Error al obtener los datos del curso:', error)
      }
    }

    fetchCursoData()
  }, [curso.id])

  const handleAddToCart = () => {
    const idUsuario = "1" // Se debe reemplazar con la lógica del provider cuando esté listo

    addToCart(curso.id, idUsuario) // Llama a la función para agregar al carrito

    alert(`Curso "${curso.titulo}" agregado al carro`)
  }

  if (!cursoData) {
    return <div>Cargando...</div>
  }

  return (
    <Card className="curso-card m-4">
      <Card.Body>
        <Link to={`/curso/${curso.id}`}>
          <Card.Title className="curso-title">{cursoData.titulo}</Card.Title>
        </Link>
        <Card.Text className="curso-description">Descripción: {cursoData.descripcion}</Card.Text>
        <Card.Text className="curso-instructor">
          <b>Instructor:</b> {cursoData.instructor}
        </Card.Text>
        <Card.Text className="curso-price">
          <b>Precio: </b> {cursoData.precio}
        </Card.Text>
        <Button variant="light" onClick={handleAddToCart} className="add-to-cart-button">
          Agregar al Carro
        </Button>
      </Card.Body>
    </Card>
  )
}

export default CursoCard
