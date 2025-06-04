import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Auth from './pages/auth'

function App() {

  return (
    
 //    <BrowserRouter>
        <Routes>    
          <Route path='/auth' element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
   //   </BrowserRouter>
     
  )
}

export default App    
