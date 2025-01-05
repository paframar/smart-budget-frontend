import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button, Stack } from '@chakra-ui/react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface BudgetDetailSkeletonProps {
  budgetName: string;
  handleBackToDashboard: () => void;
}

function BudgetDetailSkeleton(props: BudgetDetailSkeletonProps) {
  return (
    <>
      <Stack gap="6" maxW="xl">
        <Button
          size="xs"
          color="white"
          variant="surface"
          onClick={props.handleBackToDashboard}
        >
          <AiOutlineArrowLeft />
          Back to Budgets
        </Button>

        <h1>{props.budgetName}</h1>

        <h2>Incomes</h2>

        <Stack gap="3" maxW="xl">
          <Skeleton height="20px" width="500px" />
          <Skeleton height="20px" width="500px" />
          <Skeleton height="20px" width="500px" />
        </Stack>

        <h2>Expenses</h2>

        <Stack gap="3" maxW="xl">
          <Skeleton height="20px" width="500px" />
          <Skeleton height="20px" width="500px" />
          <Skeleton height="20px" width="500px" />
        </Stack>
      </Stack>
    </>
  );
}

export default BudgetDetailSkeleton;
