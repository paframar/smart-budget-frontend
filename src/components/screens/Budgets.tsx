import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getBudgets,
  deleteBudgetById,
  createBudget,
} from '@/services/budgetService';

import { Card, For, Stack, Input } from '@chakra-ui/react';
import { Toaster, toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import {
  AiFillPlusCircle,
  AiFillDelete,
  AiFillFolderOpen,
} from 'react-icons/ai';
import { Field } from '@/components/ui/field';

import BudgetsSkeleton from '../skeletons/BudgetsSkeleton';

interface Budget {
  _id: string;
  name: string;
}

const Budgets: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [newBudgetName, setNewBudgetName] = useState<string>('');

  const navigate = useNavigate();

  const handleOnNewBudgetInputChange = (val: string) => {
    setNewBudgetName(val);
  };

  const handleOnBudgetOpen = (id: string, name: string) => {
    navigate(`/budget/${id}/${name}`);
  };

  const handleOnBudgetDelete = async (id: string) => {
    const toastId = toaster.loading({
      title: 'Deleting Budget...',
      description: 'Please wait',
    });
    const deleteBudget = await deleteBudgetById(id);
    toaster.dismiss(toastId);

    if (deleteBudget.status === 204) {
      toaster.success({
        title: 'Success!',
        description: 'Budget deleted',
      });
    } else {
      toaster.error({
        title: 'Failed',
        description: 'Something went wrong while deleting the budget.',
      });
    }

    setBudgets((prevBudgets) =>
      prevBudgets.filter((budget) => budget._id !== id)
    );
  };

  const handleOnBudgetCreate = async () => {
    if (newBudgetName.length < 4) {
      toaster.create({
        title: 'Budget name must have at least 4 characters.',
        type: 'error',
      });
      return;
    }
    const toastId = toaster.loading({
      title: 'Creating Budget...',
      description: 'Please wait',
    });
    const newBudget = await createBudget(newBudgetName);
    toaster.dismiss(toastId);

    if (newBudget.status === 'success') {
      toaster.create({
        title: 'Budget created',
        type: 'success',
      });
      const budgets = await getBudgets();
      setBudgets(budgets);
      setNewBudgetName('');
    } else {
      toaster.create({
        title: 'Budget creation failed.',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    const fetchBudgets = async () => {
      const budgets = await getBudgets();
      setBudgets(budgets);
    };
    fetchBudgets();
  }, []);

  if (!budgets.length) {
    return <BudgetsSkeleton />;
  }

  return (
    <Stack gap="4" direction="row" wrap="wrap">
      <Toaster />
      <Card.Root maxW="sm">
        <Card.Header>
          <Card.Title></Card.Title>
          <Card.Description>
            Enter a name to create a new budget
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field label="Name">
              <Input
                value={newBudgetName}
                onChange={(e) => handleOnNewBudgetInputChange(e.target.value)}
              />
            </Field>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button variant="outline" onClick={handleOnBudgetCreate}>
            <AiFillPlusCircle />
            New Budget
          </Button>
        </Card.Footer>
      </Card.Root>

      <For each={budgets}>
        {(budget) => (
          <Card.Root width="320px" variant={'outline'} key={budget._id}>
            <Card.Body gap="2">
              <Card.Title mb="2"> {budget.name} </Card.Title>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button
                variant="outline"
                onClick={() => handleOnBudgetOpen(budget._id, budget.name)}
              >
                <AiFillFolderOpen />
              </Button>
              <Button
                variant="outline"
                onClick={() => handleOnBudgetDelete(budget._id)}
              >
                <AiFillDelete />
              </Button>
            </Card.Footer>
          </Card.Root>
        )}
      </For>
    </Stack>
  );
};

export default Budgets;
