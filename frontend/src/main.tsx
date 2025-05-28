
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditActivity from './components/EditActivity.tsx'
import Navbar from './components/Navbar.tsx'
import ActivityForm from './components/ActivityForm.tsx'

createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/activity/:id" element={<EditActivity />} />
      <Route path="/create" element={<ActivityForm />} />
    </Routes>
  </BrowserRouter>
)
