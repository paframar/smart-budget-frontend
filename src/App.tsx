import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/screens/Dashboard';
import BudgetDetail from './components/screens/BudgetDetail';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/budget/:id" element={<BudgetDetail />} />
      </Routes>
    </>
  );
}

export default App;
