import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Register from './pages/Register'
import Login from "./pages/Login"
import './App.css'

function App() {
  return (
    <BrowserRouter>
    <Link to="/login">login</Link>
      <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '20px' }}>Home</Link>
        <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/" element={
          <div style={{ padding: '20px' }}>
            <h1>Restaurant Reservations</h1>
            <p>Welcome to the restaurant reservation system</p>
            <Link to="/register">Go to Register</Link>
          </div>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
