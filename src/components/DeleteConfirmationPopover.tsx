import React, { useState } from 'react';
import { Input, Stack, Text } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DeleteConfirmationPopoverProps {
  children: React.ReactNode;
  title?: string;
  confirmationText: string;
  deleteCallback: () => void;
}

const DeleteConfirmationPopover = (props: DeleteConfirmationPopoverProps) => {
  const [deleteButtonDisabled, setDeleteButtonDisabled] =
    useState<boolean>(true);

  const handleInputChange = (val: string) => {
    setDeleteButtonDisabled(val != props.confirmationText);
  };

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>{props.children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Stack gap="6">
            <Text>{`Enter "${props.confirmationText}" to confirm deletion.`}</Text>
            <Input
              size="sm"
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <Button
              size="sm"
              variant="outline"
              disabled={deleteButtonDisabled}
              onClick={props.deleteCallback}
            >
              Delete
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default DeleteConfirmationPopover;
