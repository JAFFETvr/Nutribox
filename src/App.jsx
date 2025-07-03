import { useState } from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import LoginView from './feacture/login/presentation/UL/Section'
import AdminSection from './feacture/Admin/presentation/UL/Admin'
import ProductSention from './feacture/Admin/presentation/UL/Productection'
import DashboardLayout from './feacture/Admin/presentation/UL/DashboardLayout'
import Ventas from './feacture/Admin/presentation/UL/VentasSection'
import EstadisticaSection from './feacture/Admin/presentation/UL/EstadisticaSection'
import Home from './feacture/Home/presentation/UL/Home'

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginView />} />
      
    
      <Route path="/dashboard" element={<DashboardLayout />}>
        
        <Route index element={<AdminSection/>} />
       
        <Route path="products" element={<ProductSention />} />
        <Route path="sales" element={<Ventas />} /> 
        <Route path="stats" element={<EstadisticaSection />} />
      
      </Route>

     
      <Route path="*" element={<h1>404: Página No Encontrada</h1>} />

    </Routes>
  );
}

export default App;