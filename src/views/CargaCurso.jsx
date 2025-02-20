import { useState, useContext } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { CursosContext } from '../context/CursosContext'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

export default function CargaCurso() {
  const { cursos, postCurso } = useContext(CursosContext)
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    instructor: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newCurso = {
      id: cursos.length ? cursos[cursos.length - 1].id + 1 : 1,
      ...formData
    }
    postCurso(newCurso)
    alert('Curso agregado exitosamente')
    setFormData({
      titulo: '',
      descripcion: '',
      precio: '',
      instructor: ''
    })
  }

  return (
    <div>
      <NavBar />
      <Container>
        <h1 className="my-4">Carga de Curso</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Título</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Descripción</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Precio</Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Instructor</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Button variant="primary" type="submit">Agregar Curso</Button>
        </Form>
      </Container>
      <Footer />
    </div>
  )
}
