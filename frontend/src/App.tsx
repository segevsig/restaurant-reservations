import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Register from './pages/Register'
import Login from "./pages/Login"
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav>
          <div>
            <Link to="/" className="nav-logo">
              🍽️ Restaurant Reservations
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={
            <div className="page-container">
              <div className="home-container">
                <h1>Restaurant Reservations</h1>
                <p>Welcome to the restaurant reservation system. Book your table with ease!</p>
                <div className="home-actions">
                  <Link to="/register">
                    <button>Get Started</button>
                  </Link>
                  <Link to="/login">
                    <button className="button-outline">
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
