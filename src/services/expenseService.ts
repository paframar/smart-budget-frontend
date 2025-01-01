import api from '@/services/api';
import { catchAsync } from '@/utilities/catchAsync';

export const getExpensesByBudget = catchAsync(async (budgetId: string) => {
  const response = await api.get(`/budgets/${budgetId}/expenses`);
  return response.data;
}, 'Failed to fetch expenses for the budget.');

export const createExpense = catchAsync(
  async (
    name: string,
    amount: number,
    date: Date,
    category: string,
    budget: string
  ) => {
    const response = await api.post('/expenses', {
      name,
      amount,
      date,
      category,
      budget,
    });
    return response.data;
  },
  'Failed to create a new expense.'
);
