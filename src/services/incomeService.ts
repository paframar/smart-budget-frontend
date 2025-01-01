import api from '@/services/api';
import { catchAsync } from '@/utilities/catchAsync';

export const getIncomesByBudget = catchAsync(async (budgetId: string) => {
  const response = await api.get(`/budgets/${budgetId}/incomes`);
  return response.data;
}, 'Failed to fetch incomes for the budget.');

export const createIncome = catchAsync(
  async (name: string, amount: number, date: Date, budget: string) => {
    const response = await api.post('/incomes', {
      name,
      amount,
      date,
      budget,
    });
    return response.data;
  },
  'Failed to create a new income.'
);
