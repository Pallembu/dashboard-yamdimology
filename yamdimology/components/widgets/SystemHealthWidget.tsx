'use client';

import { Card, Title, Badge, Flex, Text } from '@tremor/react';
import { Activity, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Props {
  status: 'operational' | 'error' | 'warning';
  message?: string;
  lastUpdated?: string;
}

export default function SystemHealthWidget({ status, message, lastUpdated }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const getStatusColor = () => {
    switch (status) {
      case 'operational':
        return 'emerald';
      case 'warning':
        return 'amber';
      case 'error':
        return 'rose';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = () => {
    if (status === 'error' || status === 'warning') {
      return <AlertCircle className="w-6 h-6 text-rose-600" />;
    }
    return <Activity className="w-6 h-6 text-emerald-600" />;
  };

  const getStatusText = () => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'warning':
        return 'Warning';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card>
      <Flex alignItems="start">
        <div className="flex-1">
          <Title>System Status</Title>
          <Flex className="mt-4 space-x-3">
            <Badge color={getStatusColor()} size="lg">
              {getStatusText()}
            </Badge>
          </Flex>
        </div>
        <div className={`p-3 rounded-lg ${
          status === 'operational' ? 'bg-emerald-100' : 'bg-rose-100'
        }`}>
          {getStatusIcon()}
        </div>
      </Flex>
      {message && (
        <Text className="mt-4">{message}</Text>
      )}
      {mounted && lastUpdated && (
        <Text className="mt-2 text-xs text-gray-500">
          Last updated: {lastUpdated}
        </Text>
      )}
    </Card>
  );
}
