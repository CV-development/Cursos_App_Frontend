import { createContext, useState, useEffect, useContext } from 'react'
import api from '../services/api'
import { CursosContext } from './CursosContext'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const { cursos } = useContext(CursosContext)

  const loadCart = async () => {
    try {
      const response = await api.get('/api/carro')
      console.log('Carro cargado:', response.data)
      setCart(response.data)
    } catch (error) {
      console.error('Error al cargar el carrito:', error)
    }
  }

  const saveCart = async (newCart) => {
    try {
      await api.put('/api/carro', newCart)
      console.log('Carro guardado:', newCart)
      setCart(newCart)
    } catch (error) {
      console.error('Error al guardar el carrito:', error)
    }
  }

  const addToCart = async (cursoId, idUsuario) => {
    const curso = cursos.find((c) => c.id === cursoId)
    if (!curso) {
      console.error('Curso no encontrado')
      return
    }

    try {
      const response = await api.post('/api/carro', { userId: idUsuario, courseId: cursoId })
      console.log('Curso agregado al carro:', response.data)
      setCart((prevCart) => [...prevCart, response.data])
    } catch (error) {
      console.error('Error al agregar curso al carrito:', error)
    }
  }

  const deleteFromCart = async (cursoId, idUsuario) => {
    try {
      await api.delete('/api/carro', { data: { userId: idUsuario, courseId: cursoId } })
      console.log('Curso eliminado del carro')
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id_usuario === idUsuario
            ? { ...item, cursos: item.cursos.filter((c) => c.id_curso !== cursoId) }
            : item
        ).filter((item) => item.id_usuario !== idUsuario || item.cursos.length > 0)
      )
    } catch (error) {
      console.error('Error al eliminar curso del carrito:', error)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  return (
    <CartContext.Provider value={{ cart, addToCart, deleteFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
