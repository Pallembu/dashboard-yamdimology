'use client';

import { useState } from 'react';
import { Card, Title, Text, Badge, Flex, Button } from '@tremor/react';
import { Bell, CheckCheck, Trash2, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { formatDateTime } from '@/lib/dateUtils';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface ClientNotificationsProps {
  initialNotifications: Notification[];
}

export default function ClientNotifications({ initialNotifications }: ClientNotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this notification?')) {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: string): 'emerald' | 'amber' | 'rose' | 'blue' => {
    switch (type) {
      case 'success':
        return 'emerald';
      case 'warning':
        return 'amber';
      case 'error':
        return 'rose';
      default:
        return 'blue';
    }
  };

  return (
    <>
      <Flex className="mb-6">
        <Text className="text-gray-600">
          {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
        </Text>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button 
              size="xs" 
              variant="secondary"
              onClick={handleMarkAllAsRead}
            >
              <CheckCheck className="w-4 h-4 mr-1" />
              Mark all read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button 
              size="xs" 
              variant="secondary" 
              color="rose"
              onClick={handleClearAll}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear all
            </Button>
          )}
        </div>
      </Flex>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <Text className="text-gray-500">No notifications yet</Text>
            </div>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}
            >
              <Flex>
                <div className="flex gap-4 flex-1">
                  <div className={`p-2 rounded-lg h-fit ${
                    notification.type === 'success' ? 'bg-emerald-100' :
                    notification.type === 'warning' ? 'bg-amber-100' :
                    notification.type === 'error' ? 'bg-rose-100' :
                    'bg-blue-100'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <Flex>
                      <Title className="text-base">{notification.title}</Title>
                      <Badge color={getNotificationColor(notification.type)} size="xs">
                        {notification.type}
                      </Badge>
                    </Flex>
                    <Text className="mt-1">{notification.message}</Text>
                    <Text className="text-xs text-gray-500 mt-2">
                      {formatDateTime(notification.timestamp)}
                    </Text>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!notification.read && (
                    <Button 
                      size="xs" 
                      variant="secondary"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      Mark read
                    </Button>
                  )}
                  <Button 
                    size="xs" 
                    variant="secondary" 
                    color="rose"
                    onClick={() => handleDelete(notification.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </Flex>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
