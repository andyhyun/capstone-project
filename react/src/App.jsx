import { AuthProvider } from '../hooks/AuthContext'
import RequireAuth from '../components/RequireAuth'
import './App.css'
import LoginForm from '../components/LoginForm'
import Home from '../components/Home'
import Profile from '../components/Profile'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";


function App() {
  return (
    <>
    <AuthProvider>

    <Router>
      <div>
      <h1>Hackstreet Boys Directory</h1>
          <Routes>
              <Route path= "/" element = {
                <RequireAuth>
                  <Home/>
                </RequireAuth>
              } />
              <Route path="/login" element={<LoginForm />}/>
              <Route path='/profile' element={<Profile /> } />
          </Routes>
      </div>
      </Router>
      </AuthProvider>
    </>
  )
}

export default App
