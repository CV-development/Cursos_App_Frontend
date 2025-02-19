import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const URL = '../demo/Cart.json'

  const loadCart = async () => {
    try {
      const response = await axios.get(URL)
      setCart(response.data)
    } catch (error) {
      console.error('Error al cargar el carrito:', error)
    }
  }

  const saveCart = async (newCart) => {
    try {
      await axios.put(URL, newCart) // Usa PUT para reemplazar todo el contenido
      setCart(newCart) // Actualiza el estado local con el nuevo carrito
    } catch (error) {
      console.error('Error al guardar el carrito:', error)
    }
  }

  const addToCart = (curso, idUsuario) => {
    const cursoExistente = cart.find(
      (item) => item.id_usuario === idUsuario && item.cursos.some((cursoId) => cursoId === curso.id)
    )

    if (cursoExistente) {
      console.log('El curso ya está en el carrito de compras de este usuario.')
      return
    }

    const userInCart = cart.find((item) => item.id_usuario === idUsuario)

    let updatedCart
    if (userInCart) {
      updatedCart = cart.map((item) =>
        item.id_usuario === idUsuario ? { ...item, cursos: [...item.cursos, curso.id] } : item
      )
    } else {
      updatedCart = [...cart, { id_usuario: idUsuario, cursos: [curso.id] }]
    }
    saveCart(updatedCart) // Guarda el carrito actualizado
  }

  const deleteFromCart = (cursoId, idUsuario) => {
    const updatedCart = cart.map((item) =>
      item.id_usuario === idUsuario
        ? { ...item, cursos: item.cursos.filter((id) => id !== cursoId) }
        : item
    ).filter((item) => item.cursos.length > 0)

    saveCart(updatedCart) // Guarda el carrito actualizado
  }

  useEffect(() => {
    loadCart() // Carga el carrito al montar el componente
  }, [])

  return (
    <CartContext.Provider value={{ cart, addToCart, deleteFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
