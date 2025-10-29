import { Card, Title, Text } from '@tremor/react';
import { getAdminDb } from '@/firebase/adminConfig';
import ClientContacts from '@/components/ClientContacts';

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

async function fetchContacts(): Promise<Contact[]> {
  const db = getAdminDb();
  
  try {
    const usersSnapshot = await db.collection('users')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();
    
    const contacts: Contact[] = [];
    
    for (const doc of usersSnapshot.docs) {
      const data = doc.data();
      
      const resumesSnapshot = await db.collection('resumes')
        .where('userId', '==', data.uid)
        .get();
      
      let status = 'inactive';
      if (data.lastLoginAt) {
        const lastLogin = new Date(data.lastLoginAt);
        const daysSinceLogin = (Date.now() - lastLogin.getTime()) / (1000 * 60 * 60 * 24);
        if (daysSinceLogin < 7) {
          status = 'active';
        }
      }
      
      let lastActive = 'Never';
      if (data.lastLoginAt) {
        const lastLogin = new Date(data.lastLoginAt);
        const hoursSince = Math.floor((Date.now() - lastLogin.getTime()) / (1000 * 60 * 60));
        if (hoursSince < 1) {
          lastActive = 'Just now';
        } else if (hoursSince < 24) {
          lastActive = `${hoursSince} hour${hoursSince > 1 ? 's' : ''} ago`;
        } else {
          const daysSince = Math.floor(hoursSince / 24);
          lastActive = `${daysSince} day${daysSince > 1 ? 's' : ''} ago`;
        }
      }
      
      contacts.push({
        id: doc.id,
        name: data.displayName || data.email?.split('@')[0] || 'Unknown',
        email: data.email || 'N/A',
        phone: data.phoneNumber || 'N/A',
        location: 'N/A',
        status,
        joinDate: data.createdAt || data.metadata?.creationTime || new Date().toISOString(),
        resumes: resumesSnapshot.size,
        lastActive,
      });
    }

    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
}

export default async function ContactsPage() {
  const contacts = await fetchContacts();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <Title className="text-3xl font-bold text-gray-900">Contacts</Title>
        <Text className="text-gray-600 mt-2">Manage your users and contacts</Text>
      </div>

      <ClientContacts initialContacts={contacts} />
    </div>
  );
}
