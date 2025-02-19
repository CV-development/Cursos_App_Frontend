import CartProvider from '../context/CartContext'
import CursosProvider from '../context/CursosContext'
import UserProvider from '../context/UserContext'

export default function AppProvider ({ children }) {
  return (

    <UserProvider>
      <CursosProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </CursosProvider>
    </UserProvider>

  )
}
