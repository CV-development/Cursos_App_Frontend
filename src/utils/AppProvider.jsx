import CursosProvider from '../context/CursosContext'
import UserProvider from '../context/UserContext'

export default function AppProvider ({ children }) {
  return (

    <CursosProvider>
      
        {children}
      
    </CursosProvider>

  )
}
