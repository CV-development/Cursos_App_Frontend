import { useState, useContext } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { CursosContext } from '../context/CursosContext'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

export default function ModificarCurso() {
  const { cursos, putCurso } = useContext(CursosContext)
  const [selectedCurso, setSelectedCurso] = useState(null)
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    instructor: ''
  })
  const [searchId, setSearchId] = useState('')

  const handleSearch = () => {
    const curso = cursos.find((c) => c.id === parseInt(searchId))
    if (curso) {
      setSelectedCurso(curso)
      setFormData({
        titulo: curso.titulo,
        descripcion: curso.descripcion,
        precio: curso.precio,
        instructor: curso.instructor
      })
    } else {
      alert('Curso no encontrado')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedCurso) {
      putCurso(selectedCurso.id, formData)
      alert('Curso modificado exitosamente')
    } else {
      alert('Seleccione un curso para modificar')
    }
  }

  return (
    <div>
      <NavBar />
      <Container>
        <h1 className="my-4">Modificar Curso</h1>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">ID del curso</Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                placeholder="ID del curso"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </Col>
            <Col sm="2">
              <Button variant="primary" onClick={handleSearch}>Buscar</Button>
            </Col>
          </Form.Group>
        </Form>
        {selectedCurso && (
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
            <Button variant="primary" type="submit">Modificar</Button>
          </Form>
        )}
      </Container>
      <Footer />
    </div>
  )
}
