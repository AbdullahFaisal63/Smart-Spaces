import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import { authContext } from './helpers/authContext';
import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';
import PropPage from './pages/propPage';
import NewProp from './pages/newProp';
import Search from './pages/search';
import About from './pages/about';
import './output.css'

function App() {
  const [authState, setAuthState] = useState(false);
  const [loading, setLoading] = useState(true);

  const ProtectedRoute = ({ children }) => {
    return authState ? children : <Navigate to="/login" />;
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      setAuthState(false);
      setLoading(false);
      return;
    }

    axios.get("http://localhost:3001/auth/check", { headers: { accessToken } })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
        setAuthState(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <authContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/search/:query' element={<Search />} />
            <Route path='/newProp' element={
              <ProtectedRoute>
                <NewProp />
              </ProtectedRoute>
            } />
            <Route path='/prop/:id' element={
                <PropPage />
            } />
          </Routes>
        </Router>
      </authContext.Provider>
    </div>
  );
}

export default App;
