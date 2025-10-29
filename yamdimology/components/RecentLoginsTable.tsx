'use client';

import { Card, Title, Text, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Button } from '@tremor/react';
import { formatDateTime } from '@/lib/dateUtils';
import { Eye, Mail } from 'lucide-react';

interface Login {
  userId: string;
  lastLoginAt: any;
}

interface RecentLoginsTableProps {
  logins: Login[];
}

export default function RecentLoginsTable({ logins }: RecentLoginsTableProps) {
  const formatLoginTime = (lastLoginAt: any): string => {
    if (!lastLoginAt) return 'N/A';
    
    try {
      if (lastLoginAt.toDate && typeof lastLoginAt.toDate === 'function') {
        return formatDateTime({ _seconds: lastLoginAt.toDate().getTime() / 1000, _nanoseconds: 0 });
      }
      return formatDateTime(lastLoginAt);
    } catch (error) {
      return 'N/A';
    }
  };

  return (
    <Card>
      <Title>Recent Logins</Title>
      <Text className="text-gray-600 mt-2">Last 5 user logins</Text>
      
      {logins.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No recent login data available
        </div>
      ) : (
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>User ID</TableHeaderCell>
              <TableHeaderCell>Last Login Time</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logins.map((login, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Text className="font-mono text-sm">{login.userId}</Text>
                </TableCell>
                <TableCell>
                  <Text className="text-sm text-gray-600">
                    {formatLoginTime(login.lastLoginAt)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Button
                    size="xs"
                    variant="secondary"
                    onClick={() => alert(`View user details for ID: ${login.userId}\n\nThis would show full user profile and activity history.`)}
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
