'use client';

import { useState } from 'react';
import { Card, Title, Text, Grid, Badge, Flex, Button, TextInput } from '@tremor/react';
import { Search, UserPlus, Mail, Edit, Trash2, Eye } from 'lucide-react';
import { formatShortDate } from '@/lib/dateUtils';
import ContactModal from '@/components/modals/ContactModal';
import DeleteConfirmModal from '@/components/modals/DeleteConfirmModal';

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

interface ClientContactsProps {
  initialContacts: Contact[];
}

export default function ClientContacts({ initialContacts }: ClientContactsProps) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');

  const handleAddContact = () => {
    setSelectedContact(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleViewProfile = (contact: Contact) => {
    setSelectedContact(contact);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteClick = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedContact) {
      setContacts(prev => prev.filter(c => c.id !== selectedContact.id));
      setSelectedContact(null);
    }
  };

  const handleSaveContact = (contactData: Partial<Contact> & { name: string; email: string; phone: string; location: string; status: string }) => {
    if (modalMode === 'add') {
      const newContact: Contact = {
        id: `contact-${Date.now()}`,
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        location: contactData.location,
        status: contactData.status,
        joinDate: new Date().toISOString(),
        resumes: 0,
        lastActive: 'Just now',
      };
      setContacts(prev => [newContact, ...prev]);
    } else if (modalMode === 'edit' && selectedContact) {
      setContacts(prev =>
        prev.map(c => c.id === selectedContact.id ? { ...c, ...contactData } : c)
      );
    }
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const handleEmail = (email: string) => {
    if (email !== 'N/A') {
      window.location.href = `mailto:${email}`;
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: contacts.length,
    active: contacts.filter((c) => c.status === 'active').length,
    inactive: contacts.filter((c) => c.status === 'inactive').length,
  };

  return (
    <>
      <Flex className="mb-8">
        <div className="flex gap-2">
          <TextInput
            icon={Search}
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
        <Button 
          size="xs"
          onClick={handleAddContact}
        >
          <UserPlus className="w-4 h-4 mr-1" />
          Add Contact
        </Button>
      </Flex>

      {/* Stats Cards */}
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6 mb-8">
        <Card decoration="top" decorationColor="blue">
          <Text>Total Contacts</Text>
          <Text className="text-3xl font-bold mt-2">{stats.total}</Text>
        </Card>
        <Card decoration="top" decorationColor="emerald">
          <Text>Active Users</Text>
          <Flex className="mt-2">
            <Text className="text-3xl font-bold">{stats.active}</Text>
            <Badge color="emerald" size="xs">
              {stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}%
            </Badge>
          </Flex>
        </Card>
        <Card decoration="top" decorationColor="gray">
          <Text>Inactive Users</Text>
          <Text className="text-3xl font-bold mt-2">{stats.inactive}</Text>
        </Card>
      </Grid>

      {/* Contacts Grid */}
      <Grid numItemsSm={2} numItemsLg={3} className="gap-4">
        {filteredContacts.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <Text className="text-gray-500">No contacts found</Text>
            </div>
          </Card>
        ) : (
          filteredContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-lg transition-shadow">
              <Flex className="mb-4">
                <div>
                  <Title className="text-lg">{contact.name}</Title>
                  <Badge color={contact.status === 'active' ? 'emerald' : 'gray'} size="xs" className="mt-1">
                    {contact.status}
                  </Badge>
                </div>
                <Button 
                  size="xs" 
                  variant="secondary"
                  onClick={() => handleEmail(contact.email)}
                  disabled={contact.email === 'N/A'}
                >
                  <Mail className="w-3 h-3" />
                </Button>
              </Flex>
              
              <div className="space-y-2 text-sm">
                <Text className="text-gray-600">
                  <span className="font-semibold">Email:</span> {contact.email}
                </Text>
                <Text className="text-gray-600">
                  <span className="font-semibold">Phone:</span> {contact.phone}
                </Text>
                <Text className="text-gray-600">
                  <span className="font-semibold">Resumes:</span> {contact.resumes}
                </Text>
                <Text className="text-gray-600">
                  <span className="font-semibold">Last Active:</span> {contact.lastActive}
                </Text>
                <Text className="text-gray-600 text-xs">
                  Joined: {formatShortDate(contact.joinDate)}
                </Text>
              </div>

              <Flex className="mt-4 gap-2">
                <Button 
                  size="xs" 
                  variant="secondary"
                  onClick={() => handleViewProfile(contact)}
                  className="flex-1"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button 
                  size="xs" 
                  variant="secondary"
                  onClick={() => handleEditContact(contact)}
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button 
                  size="xs" 
                  variant="secondary"
                  color="rose"
                  onClick={() => handleDeleteClick(contact)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </Flex>
            </Card>
          ))
        )}
      </Grid>

      {/* Modals */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveContact}
        contact={selectedContact}
        mode={modalMode}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Contact"
        message="Are you sure you want to delete this contact?"
        itemName={selectedContact?.name}
      />
    </>
  );
}