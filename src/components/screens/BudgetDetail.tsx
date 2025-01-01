import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBudgetById } from '@/services/budgetService';

interface Income {
  id: string;
  name: string;
  amount: number;
}

interface Expense {
  id: string;
  name: string;
  amount: number;
}

interface Budget {
  id: string;
  name: string;
  incomes: Income[];
  expenses: Expense[];
}

const BudgetDetail: React.FC = () => {
  const params = useParams();
  console.log('params', params);
  const [budget, setBudget] = useState<Budget>();

  useEffect(() => {
    const fetchBudgetDetails = async () => {
      if (!params.id) return;
      const budgetData = await getBudgetById(params.id);
      console.log('budgetData', budgetData);
      setBudget(budgetData);
    };

    fetchBudgetDetails();
  }, [params.id]);

  return (
    <div>
      <h1>Budget Detail</h1>
      {budget && <h2>{budget.name}</h2>}
      <h3>Incomes</h3>
      <ul>
        {budget?.incomes.map((income) => (
          <li key={income.id}>
            {income.name}: ${income.amount}
          </li>
        ))}
      </ul>
      <h3>Expenses</h3>
      <ul>
        {budget?.expenses.map((expense) => (
          <li key={expense.id}>
            {expense.name}: ${expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetDetail;
