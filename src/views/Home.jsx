import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import { useContext } from 'react'
import { CursosContext } from '../context/CursosContext'

export default function Home () {
  const { cursos } = useContext(CursosContext)
  return (
    <div>
      <NavBar />
      <Gallery cursos={cursos} />
      <Footer />
    </div>
  )
}
