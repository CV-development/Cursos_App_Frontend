import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // Cargar usuario desde localStorage al iniciar la app
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedUser'))
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  // Función para registrar usuario
  const registerUser = async (email, password) => {
    try {
      const res = await api.post('/api/auth/register', { email, password })
      console.log('Usuario registrado:', res.data) // Mensaje de depuración
      const newUser = res.data
      setUser(newUser)
      localStorage.setItem('loggedUser', JSON.stringify(newUser))
      navigate('/perfil')
    } catch (error) {
      console.error('Error al registrar usuario:', error)
      alert('Error al registrar usuario.')
    }
  }

  // Función para iniciar sesión
  const loginUser = async (email, password) => {
    try {
      const res = await api.post('/api/auth/login', { email, password })
      const loggedInUser = res.data
      setUser(loggedInUser)
      localStorage.setItem('loggedUser', JSON.stringify(loggedInUser))
      navigate('/perfil')
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      alert('Credenciales incorrectas o usuario no registrado.')
    }
  }

  // Función para cerrar sesión
  const logoutUser = () => {
    setUser(null)
    localStorage.removeItem('loggedUser')
    navigate('/')
  }

  return (
    <UserContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
