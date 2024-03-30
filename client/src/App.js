// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import login from './pages/login'
import home from './pages/home'

function App() {
  
  useEffect(() => {
    axios.get("http://localhost:3001/users").then((response) => {
      console.log(response);
    });
  }, []);

  return (
  <div className="App">
    <Router>
      <Routes>
        <Route path='/' exact Component={home}/>
        <Route path='/login' exact Component={login}/>
      </Routes>
    </Router>
  </div>
  )
}

export default App;
