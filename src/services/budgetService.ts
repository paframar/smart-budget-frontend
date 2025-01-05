import api from '@/services/api';
import { catchAsync } from '@/utilities/catchAsync';

export const getBudgets = catchAsync(async () => {
  const response = await api.get('/budgets');
  0;
  console.log('response -- ', response);
  return response.data.data;
}, 'Failed to fetch budgets.');

export const createBudget = catchAsync(async (name: string) => {
  const response = await api.post('/budgets', { name });
  return response.data;
}, 'Failed to create a new budget.');

export const getBudgetById = catchAsync(async (id: string) => {
  const response = await api.get(`/budgets/${id}`);
  return response.data.data;
}, 'Failed to fetch the budget details.');

export const deleteBudgetById = catchAsync(async (id: string) => {
  const response = await api.delete(`/budgets/${id}`);
  return response;
}, 'Failed to delete budget');
