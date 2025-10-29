'use client';

import { Dialog, DialogPanel, Button, Flex, Title, Text } from '@tremor/react';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  itemName?: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
}: DeleteConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <Dialog open={isOpen} onClose={onClose} static={true} className="z-50">
        <DialogPanel className="max-w-md bg-white">
          <Flex className="mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-rose-600" />
              </div>
              <Title>{title}</Title>
            </div>
          </Flex>

        <div className="space-y-4">
          <Text>{message}</Text>
          
          {itemName && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <Text className="font-semibold">{itemName}</Text>
            </div>
          )}

          <Text className="text-rose-600 text-sm">
            This action cannot be undone.
          </Text>
        </div>

        <Flex className="mt-6 gap-2">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            color="rose"
            onClick={handleConfirm}
            className="flex-1"
          >
            Delete
          </Button>
        </Flex>
      </DialogPanel>
    </Dialog>
    </>
  );
}
