import api from '@/services/api';
import { catchAsync } from '@/utilities/catchAsync';

export const getCategories = catchAsync(async () => {
  const response = await api.get('/categories');
  return response.data;
}, 'Failed to fetch categories.');
