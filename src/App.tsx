import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Budgets from './components/screens/Budgets';
import BudgetDetail from './components/screens/BudgetDetail';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Budgets />} />
        <Route path="/budget/:id/:name" element={<BudgetDetail />} />
      </Routes>
    </>
  );
}

export default App;
