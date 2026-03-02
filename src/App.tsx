
import './App.css'
import AppHeader from './components/header/Header'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/home/Home'
import Services from './pages/services/Services'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import WatchMovie from './pages/home/watch-movie/WatchMovie'
import { useEffect, useState } from 'react' 
import { API_BASE_URL, API_KEY } from "./constants/index"


// dinmaic route
function App()  {
  const [movies, setMovies] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE_URL}/trending/movie/week${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.results);
        setMovies(data.results)
      })
  }, [])

  return (
    <div className="app-container">
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/about" element={<About />} />
          <Route path="/watch/:id" element={<WatchMovie />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
