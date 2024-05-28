import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CalculateTime from './components/CalcTime';
import CalculateDistance from './components/CalcDistance';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/calculate-time" element={<CalculateTime />} />
          <Route path="/calculate-distance" element={<CalculateDistance />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
