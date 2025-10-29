import { Card, Title, Text } from '@tremor/react';
import { getAdminDb } from '@/firebase/adminConfig';
import ClientCalendar from '@/components/ClientCalendar';

interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
  description: string;
}

async function fetchEvents(): Promise<Event[]> {
  const db = getAdminDb();
  
  try {
    // Fetch interview sessions as calendar events
    const sessionsSnapshot = await db.collection('interview_sessions')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();
    
    const events: Event[] = [];
    
    sessionsSnapshot.forEach((doc) => {
      const data = doc.data();
      
      const type = data.status === 'ended' ? 
        (data.endReason === 'completed' ? 'completed' : 'cancelled') : 
        'scheduled';
      
      const title = data.jobTitle 
        ? `${data.sessionType === 'practice' ? 'Practice' : 'Real'}: ${data.jobTitle}`
        : `${data.sessionType === 'practice' ? 'Practice' : 'Real'} Interview`;
      
      const description = `User: ${data.userId}${data.companyName ? `, Company: ${data.companyName}` : ''}${data.minutesUsed ? `, ${data.minutesUsed} min` : ''}`;
      
      events.push({
        id: doc.id,
        title,
        date: data.startTime || data.createdAt,
        type,
        description,
      });
    });

    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export default async function CalendarPage() {
  const events = await fetchEvents();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <Title className="text-3xl font-bold text-gray-900">Calendar</Title>
        <Text className="text-gray-600 mt-2">View interview sessions on calendar</Text>
      </div>

      <ClientCalendar initialEvents={events} />
    </div>
  );
}
