import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, HStack, Stack } from '@chakra-ui/react';

function BudgetsSkeleton() {
  const CardSkeleton = () => (
    <Card.Root maxW="sm">
      <Card.Header>
        <Skeleton height="20px" width="200px" />
      </Card.Header>
      <Card.Body>
        <Stack gap="2" maxW="xl">
          <Skeleton height="12px" width="200px" />
          <Skeleton height="12px" width="200px" />
          <Skeleton height="12px" width="200px" />
        </Stack>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Skeleton height="12px" width="200px" />
      </Card.Footer>
    </Card.Root>
  );

  return (
    <Stack gap="6" maxW="xl">
      <HStack gap="4">
        <CardSkeleton />
        <CardSkeleton />
      </HStack>
      <HStack gap="4">
        <CardSkeleton />
        <CardSkeleton />
      </HStack>
    </Stack>
  );
}

export default BudgetsSkeleton;
