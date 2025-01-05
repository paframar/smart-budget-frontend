import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBudgetById } from '@/services/budgetService';
import { HStack, Stack, Table } from '@chakra-ui/react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { AiFillEdit, AiFillDelete, AiOutlineArrowLeft } from 'react-icons/ai';

import { format } from 'date-fns';
import BudgetDetailSkeleton from '../skeletons/BudgetDetailSkeleton';
interface Income {
  id: string;
  name: string;
  amount: number;
}

interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
}

interface Budget {
  id: string;
  name: string;
  incomes: Income[];
  expenses: Expense[];
}

const BudgetDetail: React.FC = () => {
  const params = useParams();
  const [budget, setBudget] = useState<Budget | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBudgetDetails = async () => {
      if (!params.id) return;
      const budgetData = await getBudgetById(params.id);
      setBudget(budgetData);
    };
    fetchBudgetDetails();
  }, [params.id]);

  const handleBackToDashboard = () => {
    navigate('/');
  };

  if (!budget) {
    return (
      <BudgetDetailSkeleton
        budgetName={params.name as string}
        handleBackToDashboard={handleBackToDashboard}
      />
    );
  }

  return (
    <Stack gap="10">
      <Button
        size="xs"
        color="white"
        variant="surface"
        onClick={handleBackToDashboard}
      >
        <AiOutlineArrowLeft />
        Back to Budgets
      </Button>
      <h1>{budget.name}</h1>
      <h2>Incomes</h2>

      <Table.Root key={'incomes'} size={'lg'}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>DATE</Table.ColumnHeader>
            <Table.ColumnHeader>NAME</Table.ColumnHeader>
            <Table.ColumnHeader>AMOUNT</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {budget.incomes.map((income) => (
            <Table.Row key={income.id}>
              <Table.Cell>
                {format(new Date(income.date), 'dd-MM-yyyy')}
              </Table.Cell>
              <Table.Cell>{income.name}</Table.Cell>
              <Table.Cell>{income.amount}</Table.Cell>
              <Table.Cell>
                <HStack>
                  <Button size="xs" color="white" variant="surface">
                    <AiFillEdit />
                  </Button>
                  <Button size="xs" color="white" variant="surface">
                    <AiFillDelete />
                  </Button>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <h2>Expenses</h2>

      <Table.Root key={'expenses'} size={'lg'}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>DATE</Table.ColumnHeader>
            <Table.ColumnHeader>NAME</Table.ColumnHeader>
            <Table.ColumnHeader>AMOUNT</Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {budget.expenses.map((expense) => (
            <Table.Row key={expense.id}>
              <Table.Cell>
                {format(new Date(expense.date), 'dd-MM-yyyy')}
              </Table.Cell>
              <Table.Cell>
                {`${expense.name}
                  (${expense.category.name})`}
              </Table.Cell>
              <Table.Cell>{expense.amount}</Table.Cell>
              <Table.Cell>
                <HStack>
                  <Button size="xs" color="white" variant="surface">
                    <AiFillEdit />
                  </Button>
                  <Button size="xs" color="white" variant="surface">
                    <AiFillDelete />
                  </Button>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
};

export default BudgetDetail;
