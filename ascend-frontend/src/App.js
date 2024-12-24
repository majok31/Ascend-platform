import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = () => <h1>Home Page</h1>;
const Dashboard = () => <h1>Dashboard</h1>;
const Courses = () => <h1>Courses</h1>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </Router>
  );
}

export default App;

