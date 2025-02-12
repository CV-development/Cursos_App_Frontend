import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Curso from './views/Curso'
import Login from './views/Login'
import Register from './views/Register'
import Carro from './views/Carro'
import Reportes from './views/Reportes'
import CargaCurso from './views/CargaCurso'
import ModificarCurso from './views/ModificarCurso'
import Perfil from './views/Perfil'
import NotFound from './views/NotFound'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/curso/:cursoId'
          element={<Curso />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/carro'
          element={<Carro />}
        />
        <Route
          path='/reportes'
          element={<Reportes />}
        />
        <Route
          path='/cargaCursos'
          element={<CargaCurso />}
        />
        <Route
          path='/modificarCursos'
          element={<ModificarCurso />}
        />
        <Route
          path='/perfil'
          element={<Perfil />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </div>
  )
}

export default App
