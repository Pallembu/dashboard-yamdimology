'use client';

import { Card, Title, Text, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from '@tremor/react';
import { formatMonthYear } from '@/lib/dateUtils';

interface User {
  email: string;
  createdAt: string;
}

interface RecentUsersTableProps {
  users: User[];
}

export default function RecentUsersTable({ users }: RecentUsersTableProps) {
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
