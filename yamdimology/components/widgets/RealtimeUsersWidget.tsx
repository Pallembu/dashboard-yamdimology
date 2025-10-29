'use client';

import { useEffect, useState } from 'react';
import { Card, Metric, Text, Flex, BadgeDelta } from '@tremor/react';
import { db } from '@/firebase/config';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { Users } from 'lucide-react';

export default function RealtimeUsersWidget() {
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'analytics_realtime'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const totalUsers = snapshot.size;
      setActiveUsers(totalUsers);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Card decoration="top" decorationColor="emerald">
      <Flex alignItems="start">
        <div className="flex-1">
          <Text>Active Users</Text>
          <Metric>{loading ? '...' : activeUsers.toLocaleString()}</Metric>
        </div>
        <div className="p-3 bg-emerald-100 rounded-lg">
          <Users className="w-6 h-6 text-emerald-600" />
        </div>
      </Flex>
      <Flex className="mt-4">
        <BadgeDelta deltaType="moderateIncrease" size="xs">
          Live
        </BadgeDelta>
      </Flex>
    </Card>
  );
}
