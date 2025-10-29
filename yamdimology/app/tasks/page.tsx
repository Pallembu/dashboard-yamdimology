import { Card, Title, Text, Grid } from '@tremor/react';
import { getAdminDb } from '@/firebase/adminConfig';
import ClientTasks from '@/components/ClientTasks';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  assignee: string;
  progress: number;
}

async function fetchTasks(): Promise<Task[]> {
  const db = getAdminDb();
  
  try {
    // Fetch interview sessions as tasks
    const sessionsSnapshot = await db.collection('interview_sessions')
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get();
    
    const tasks: Task[] = [];
    
    sessionsSnapshot.forEach((doc) => {
      const data = doc.data();
      
      // Determine status
      let status = 'pending';
      let progress = 0;
      
      if (data.status === 'ended') {
        if (data.endReason === 'completed') {
          status = 'completed';
          progress = 100;
        } else {
          status = 'in-progress';
          progress = 50;
        }
      } else if (data.status === 'active') {
        status = 'in-progress';
        progress = (data.totalAnswers / (data.totalQuestions || 1)) * 100;
      }
      
      // Determine priority based on interview type and status
      let priority = 'medium';
      if (data.sessionType === 'real' || data.sessionType === 'interview') {
        priority = 'high';
      } else if (data.status === 'active') {
        priority = 'high';
      } else if (data.totalQuestions === 0) {
        priority = 'low';
      }
      
      const title = data.jobTitle 
        ? `${data.sessionType === 'practice' ? 'Practice' : 'Real'} Interview: ${data.jobTitle}${data.companyName ? ` at ${data.companyName}` : ''}`
        : `${data.sessionType === 'practice' ? 'Practice' : 'Real'} Interview Session`;
      
      const description = `User ${data.userId} - ${data.totalQuestions || 0} questions${data.totalAnswers ? `, ${data.totalAnswers} answered` : ''}${data.minutesUsed ? `, ${data.minutesUsed} min used` : ''}`;
      
      tasks.push({
        id: doc.id,
        title,
        description,
        status,
        priority,
        dueDate: data.endTime || data.startTime || data.createdAt,
        assignee: `User ${data.userId?.substring(0, 8)}...`,
        progress,
      });
    });

    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

export default async function TasksPage() {
  const tasks = await fetchTasks();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <Title className="text-3xl font-bold text-gray-900">Tasks</Title>
        <Text className="text-gray-600 mt-2">Interview sessions as tasks</Text>
      </div>

      <ClientTasks initialTasks={tasks} />
    </div>
  );
}
