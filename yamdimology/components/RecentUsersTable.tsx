'use client';

import { Card, Title, Text, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Button } from '@tremor/react';
import { formatMonthYear } from '@/lib/dateUtils';
import { Eye, Mail } from 'lucide-react';

interface User {
  email: string;
  createdAt: string;
}

interface RecentUsersTableProps {
  users: User[];
}

export default function RecentUsersTable({ users }: RecentUsersTableProps) {
  const handleViewUser = (email: string) => {
    alert(`View user details for: ${email}\n\nThis would open a modal with full user information.`);
  };

  const handleEmailUser = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <Card>
      <Title>Recent Users</Title>
      <Text className="mt-2 text-gray-600">Last 5 registered users</Text>
      
      {users.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No users found
        </div>
      ) : (
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Registration Date</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Text className="font-medium">{user.email}</Text>
                </TableCell>
                <TableCell>
                  {formatMonthYear(user.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="xs"
                      variant="secondary"
                      onClick={() => handleViewUser(user.email)}
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button
                      size="xs"
                      variant="secondary"
                      onClick={() => handleEmailUser(user.email)}
                    >
                      <Mail className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
