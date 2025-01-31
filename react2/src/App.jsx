import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PageNotFound from '../pages/PageNotFound';
import EstadisticasUsers from '../pages/EstadisticasUsers';
import 'flowbite';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="*" element={<PageNotFound />} /> {/* Página 404 */}
          <Route path="/estadisticas" element = {<EstadisticasUsers/>}/> {/*Ruta para estadisticas de usuarios*/}
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
