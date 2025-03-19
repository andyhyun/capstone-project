import { useState, useEffect } from 'react'
import { AuthProvider } from '../hooks/AuthContext'
import RequireAuth from '../components/RequireAuth'
import './App.css'
import LoginForm from '../components/LoginForm'
import Home from '../components/Home'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";


function App() {
  return (
    <>
    <Router>
      <div>
      <h1>Employee Directory</h1>
        <AuthProvider>
          <Routes>
              <Route path= "/" element = {
                <RequireAuth>
                  <Home/>
                </RequireAuth>
              } />
              <Route path="/login" element={<LoginForm />}/>
            
              
          
          </Routes>
        </AuthProvider>
      </div>
      </Router>
    </>
  )
}

export default App
