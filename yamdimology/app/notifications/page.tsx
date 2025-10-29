import { Card, Title, Text } from '@tremor/react';
import { getAdminDb } from '@/firebase/adminConfig';
import ClientNotifications from '@/components/ClientNotifications';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

async function fetchNotifications(): Promise<Notification[]> {
  const db = getAdminDb();
  
  try {
    // Fetch recent interview sessions as notifications
    const sessionsSnapshot = await db.collection('interview_sessions')
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();
    
    const notifications: Notification[] = [];
    
    sessionsSnapshot.forEach((doc) => {
      const data = doc.data();
      
      // Create notification for each interview session
      if (data.status === 'ended') {
        notifications.push({
          id: doc.id,
          type: data.endReason === 'completed' ? 'success' : 'info',
          title: `Interview Session ${data.endReason === 'completed' ? 'Completed' : 'Ended'}`,
          message: `User ${data.userId} ${data.endReason === 'completed' ? 'completed' : 'ended'} a ${data.sessionType} interview session${data.jobTitle ? ` for ${data.jobTitle}` : ''}. Duration: ${data.minutesUsed || 0} minutes.`,
          timestamp: data.endTime || data.createdAt,
          read: false,
        });
      } else if (data.status === 'active') {
        notifications.push({
          id: doc.id,
          type: 'warning',
          title: 'Active Interview Session',
          message: `User ${data.userId} has an ongoing ${data.sessionType} interview session${data.jobTitle ? ` for ${data.jobTitle}` : ''}.`,
          timestamp: data.createdAt,
          read: false,
        });
      }
    });

    // Add payment notifications
    const paymentsSnapshot = await db.collection('payments')
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get();
    
    paymentsSnapshot.forEach((doc) => {
      const data = doc.data();
      
      if (data.status === 'success' || data.status === 'completed') {
        notifications.push({
          id: `payment_${doc.id}`,
          type: 'success',
          title: 'Payment Received',
          message: `Payment of Rp ${data.totalPayment?.toLocaleString() || 0} received from user ${data.userId}${data.email ? ` (${data.email})` : ''}.`,
          timestamp: data.createdAt,
          read: false,
        });
      } else if (data.status === 'expired') {
        notifications.push({
          id: `payment_${doc.id}`,
          type: 'warning',
          title: 'Payment Expired',
          message: `Payment from user ${data.userId} has expired. Amount: Rp ${data.totalPayment?.toLocaleString() || 0}.`,
          timestamp: data.createdAt,
          read: false,
        });
      }
    });

    // Sort by timestamp descending
    notifications.sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeB - timeA;
    });

    return notifications.slice(0, 15);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}

export default async function NotificationsPage() {
  const notifications = await fetchNotifications();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <Title className="text-3xl font-bold text-gray-900">Notifications</Title>
        <Text className="text-gray-600 mt-2">
          System notifications from interview sessions and payments
        </Text>
      </div>

      <ClientNotifications initialNotifications={notifications} />
    </div>
  );
}
