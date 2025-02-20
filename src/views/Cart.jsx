import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function Cart() {
  const { cart, deleteFromCart } = useContext(CartContext)

  const handleDelete = (id_curso, id_usuario) => {
    deleteFromCart(id_curso, id_usuario)
  }

  return (
    <div>
      <NavBar />
      <h1>Carro de Compras</h1>
      {cart.map((userCart) => (
        <div key={userCart.id_usuario}>
          <h2>Usuario: {userCart.id_usuario}</h2>
          <ul>
            {userCart.cursos.map((curso) => (
              <li key={curso.id_curso}>
                {curso.nombre} - ${curso.precio}
                <button onClick={() => handleDelete(curso.id_curso, userCart.id_usuario)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={() => alert('Pagar')}>Pagar</button>
      <Footer />
    </div>
  )
}
