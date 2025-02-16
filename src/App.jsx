import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Curso from './views/Curso'
import Login from './views/Login'
import Register from './views/Register'
import Cart from './views/Cart'
import Reports from './views/Reports'
import CargaCurso from './views/CargaCurso'
import ModificarCurso from './views/ModificarCurso'
import Perfil from './views/Perfil'
import NotFound from './views/NotFound'
import Checkout from './views/Checkout'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/curso/:cursoId' element={<Curso />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/cargacurso' element={<CargaCurso />} />
        <Route path='/modificarCurso' element={<ModificarCurso />} />
        <Route path='/perfil' element={<Perfil />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
