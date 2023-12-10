import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './FrontPage';
import Signin from './Signin';
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<FrontPage />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
