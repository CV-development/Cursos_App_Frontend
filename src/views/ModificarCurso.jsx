import { useState, useContext } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { CursosContext } from '../context/CursosContext'

export default function ModificarCurso() {
  const { cursos, putCurso } = useContext(CursosContext)
  const [selectedCurso, setSelectedCurso] = useState(null)
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    instructor: ''
  })

  const handleSearch = (id) => {
    const curso = cursos.find((c) => c.id === parseInt(id))
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
      <h1>Modificar Curso</h1>
      <div>
        <input
          type="number"
          placeholder="ID del curso"
          onBlur={(e) => handleSearch(e.target.value)}
        />
      </div>
      {selectedCurso && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Título:</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Descripción:</label>
            <input
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Precio:</label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Instructor:</label>
            <input
              type="text"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Modificar</button>
        </form>
      )}
      <Footer />
    </div>
  )
}
