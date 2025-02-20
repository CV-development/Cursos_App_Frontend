import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import './Cart.css' // Import the CSS file for custom styles

export default function Cart() {
  const { cart, deleteFromCart } = useContext(CartContext)

  const handleDelete = (id_curso, id_usuario) => {
    deleteFromCart(id_curso, id_usuario)
  }

  return (
    <div>
      <NavBar />
      <Container>
        <h1 className="my-4">Carro de Compras</h1>
        {cart.map((userCart) => (
          <div key={userCart.id_usuario}>
            <h2>Usuario: {userCart.id_usuario}</h2>
            <Row>
              {userCart.cursos.map((curso) => (
                <Col md={4} key={curso.id_curso}>
                  <Card className="mb-4 cart-card">
                    <Card.Body>
                      <Card.Title>{curso.nombre}</Card.Title>
                      <Card.Text>Precio: ${curso.precio}</Card.Text>
                      <Button variant="danger" onClick={() => handleDelete(curso.id_curso, userCart.id_usuario)}>Eliminar</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
        <Button variant="success" onClick={() => alert('Pagar')} className="mt-4">Pagar</Button>
      </Container>
      <Footer />
    </div>
  )
}
