import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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

  // Función para registrar usuario con nombre
  const registerUser = (name, email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || []

    if (storedUsers.some(user => user.email === email)) {
      alert('El usuario ya está registrado.')
      return
    }

    const newUser = { name, email, password }
    storedUsers.push(newUser)
    localStorage.setItem('users', JSON.stringify(storedUsers))

    setUser(newUser)
    localStorage.setItem('loggedUser', JSON.stringify(newUser))
    navigate('/perfil')
  }

  // Función para iniciar sesión con validaciones
  const loginUser = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || []

    const foundUser = storedUsers.find(user => user.email === email && user.password === password)

    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem('loggedUser', JSON.stringify(foundUser))
      navigate('/perfil')
    } else {
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
