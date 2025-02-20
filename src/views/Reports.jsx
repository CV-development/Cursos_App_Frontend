import { useContext } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { CursosContext } from '../context/CursosContext'
import { Container, Row, Col } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'

export default function Reports() {
  const { cursos } = useContext(CursosContext)

  const data = {
    labels: cursos.map(curso => curso.titulo),
    datasets: [
      {
        label: 'Precio',
        data: cursos.map(curso => curso.precio),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  return (
    <div>
      <NavBar />
      <Container>
        <h1 className="my-4">Reportes</h1>
        <Row>
          <Col>
            <Bar data={data} options={options} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}
