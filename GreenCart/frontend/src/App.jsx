import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Drivers from './Components/Drivers';
import RoutesComponent from './Components/RouteComponent';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans">
        <nav className="bg-gray-800 text-white shadow-md">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">GreenCart Logistics</h1>
            <div className="space-x-6">
              <Link to="/" className="hover:text-blue-300 transition-colors duration-300">Dashboard</Link>
              <Link to="/drivers" className="hover:text-blue-300 transition-colors duration-300">Drivers</Link>
              <Link to="/routes" className="hover:text-blue-300 transition-colors duration-300">Routes</Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/routes" element={<RoutesComponent />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;