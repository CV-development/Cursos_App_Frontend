import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

function NavBar() {
  const { user } = useContext(UserContext)

  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand as={Link} to='/'>Cursos App Store</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/cart'>Carro</Nav.Link>
            <Nav.Link as={Link} to='/perfil'>Perfil</Nav.Link>
            {!user ? (
              <>
                <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                <Nav.Link as={Link} to='/register'>Registro</Nav.Link>
              </>
            ) : (
              // Aquí podrías agregar un enlace de "Logout" o similar si el usuario está autenticado
              <Nav.Link as={Link} to='/logout'>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
