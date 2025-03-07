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
      console.log('Carro cargado:', response.data) // Mensaje de depuración
      setCart(response.data)
    } catch (error) {
      console.error('Error al cargar el carrito:', error)
    }
  }

  const saveCart = async (newCart) => {
    try {
      await api.put('/api/carro', newCart)
      console.log('Carro guardado:', newCart) // Mensaje de depuración
      setCart(newCart)
    } catch (error) {
      console.error('Error al guardar el carrito:', error)
    }
  }

  const addToCart = (cursoId, idUsuario) => {
    const curso = cursos.find((c) => c.id === cursoId)
    if (!curso) {
      console.error('Curso no encontrado')
      return
    }

    const userInCart = cart.find((item) => item.id_usuario === idUsuario)

    let updatedCart
    if (userInCart) {
      const cursoExistente = userInCart.cursos.some((c) => c.id_curso === cursoId)
      if (cursoExistente) {
        console.log('El curso ya está en el carrito de compras de este usuario.')
        return
      }
      updatedCart = cart.map((item) =>
        item.id_usuario === idUsuario ? { ...item, cursos: [...item.cursos, { id_curso: curso.id, nombre: curso.titulo, precio: curso.precio }] } : item
      )
    } else {
      updatedCart = [...cart, { id_usuario: idUsuario, cursos: [{ id_curso: curso.id, nombre: curso.titulo, precio: curso.precio }] }]
    }
    saveCart(updatedCart)
  }

  const deleteFromCart = (cursoId, idUsuario) => {
    const updatedCart = cart.map((item) =>
      item.id_usuario === idUsuario
        ? { ...item, cursos: item.cursos.filter((c) => c.id_curso !== cursoId) }
        : item
    ).filter((item) => item.id_usuario !== idUsuario || item.cursos.length > 0)

    saveCart(updatedCart)
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
