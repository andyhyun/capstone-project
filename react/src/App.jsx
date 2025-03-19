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
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/employees`);
            if (!response.ok) {
                throw new Error('Data could not be fetched!');
            }
            const json_response = await response.json();
            setData(json_response); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

  return (
    <>
    <Router>
      <div>
      <h1>Employee Directory</h1>
        <AuthProvider>
          <Routes>
              <Route path= "/" element = {<Home data={data}/>} />
              <Route path="/Login" element={<LoginForm />}/>
            
              
          
          </Routes>
        </AuthProvider>
      </div>
      </Router>
    </>
  )
}

export default App
