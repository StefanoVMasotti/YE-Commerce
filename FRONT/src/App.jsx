import { Routes, Route } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    )
}

export default App
