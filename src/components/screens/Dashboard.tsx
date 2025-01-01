import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBudgets } from '@/services/budgetService';

interface Budget {
  _id: string;
  name: string;
}

const Dashboard: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      const data = await getBudgets();
      console.log('data ', data);
      setBudgets(data);
    };

    fetchBudgets();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {budgets && (
        <ul>
          {budgets &&
            budgets.map((budget) => (
              <li key={budget._id}>
                <Link to={`/budget/${budget._id}`}>{budget.name}</Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
