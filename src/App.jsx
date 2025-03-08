import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Weather from './components/pages/weather';
import Maps from './components/pages/maps';
import About from './components/pages/about';
import Contact from './components/pages/contact';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Weather" element={<Weather />} />
          <Route path="/Maps" element={<Maps />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/" element={<Weather />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
