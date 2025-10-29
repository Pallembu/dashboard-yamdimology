'use client';

import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogPanel, 
  TextInput, 
  Button, 
  Flex,
  Title,
  Text 
} from '@tremor/react';
import { X } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  joinDate: string;
  resumes: number;
  lastActive: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: Partial<Contact> & { name: string; email: string; phone: string; location: string; status: string }) => void;
  contact?: Contact | null;
  mode: 'add' | 'edit' | 'view';
}

export default function ContactModal({ 
  isOpen, 
  onClose, 
  onSave, 
  contact, 
  mode 
}: ContactModalProps) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    status: 'active',
    joinDate: '',
    resumes: 0,
    lastActive: '',
  });

  useEffect(() => {
    if (contact && (mode === 'edit' || mode === 'view')) {
      setFormData(contact);
    } else {
      setFormData({
        id: '',
        name: '',
        email: '',
        phone: '',
        location: '',
        status: 'active',
        joinDate: '',
        resumes: 0,
        lastActive: '',
      });
    }
  }, [contact, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isViewMode = mode === 'view';

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
        <DialogPanel className="max-w-2xl bg-white">
          <Flex className="mb-6">
            <Title>
              {mode === 'add' && 'Add New Contact'}
              {mode === 'edit' && 'Edit Contact'}
              {mode === 'view' && 'Contact Details'}
            </Title>
            <Button
              variant="light"
              onClick={onClose}
              className="p-1"
            >
              <X className="w-5 h-5" />
            </Button>
          </Flex>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Text className="mb-2 font-medium">Name</Text>
            <TextInput
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              disabled={isViewMode}
              required
            />
          </div>

          <div>
            <Text className="mb-2 font-medium">Email</Text>
            <TextInput
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={isViewMode}
              required
            />
          </div>

          <div>
            <Text className="mb-2 font-medium">Phone</Text>
            <TextInput
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              disabled={isViewMode}
            />
          </div>

          <div>
            <Text className="mb-2 font-medium">Location</Text>
            <TextInput
              placeholder="Enter location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              disabled={isViewMode}
            />
          </div>

          <div>
            <Text className="mb-2 font-medium">Status</Text>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              disabled={isViewMode}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {mode === 'view' && (
            <>
              <div>
                <Text className="mb-2 font-medium">Resumes</Text>
                <Text>{formData.resumes || 0}</Text>
              </div>
              <div>
                <Text className="mb-2 font-medium">Last Active</Text>
                <Text>{formData.lastActive || 'N/A'}</Text>
              </div>
              <div>
                <Text className="mb-2 font-medium">Join Date</Text>
                <Text>{formData.joinDate || 'N/A'}</Text>
              </div>
            </>
          )}

          <Flex className="mt-6 gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              {isViewMode ? 'Close' : 'Cancel'}
            </Button>
            {!isViewMode && (
              <Button
                type="submit"
                className="flex-1"
              >
                {mode === 'add' ? 'Add Contact' : 'Save Changes'}
              </Button>
            )}
          </Flex>
        </form>
      </DialogPanel>
    </Dialog>
    </>
  );
}
