'use client';

import { useState } from 'react';
import { Card, Title, Text, Badge, Flex, Button, Grid } from '@tremor/react';
import { CheckCircle2, Circle, Clock, Plus } from 'lucide-react';
import ClientProgressBar from '@/components/ClientProgressBar';
import { formatDateTime } from '@/lib/dateUtils';

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

interface ClientTasksProps {
  initialTasks: Task[];
}

export default function ClientTasks({ initialTasks }: ClientTasksProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleCompleteTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, status: 'completed', progress: 100 } : t)
    );
  };

  const handleEditTask = (id: string) => {
    alert(`View task ${id}: This would show full interview session details`);
  };

  const handleNewTask = () => {
    alert('New Task: In production, this would create a new interview session');
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    pending: tasks.filter((t) => t.status === 'pending').length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string): 'rose' | 'amber' | 'gray' => {
    switch (priority) {
      case 'high':
        return 'rose';
      case 'medium':
        return 'amber';
      default:
        return 'gray';
    }
  };

  return (
    <>
      <Flex className="mb-8">
        <div className="flex gap-2">
          <Text className="text-sm text-gray-500">
            {tasks.length} interview session{tasks.length !== 1 ? 's' : ''}
          </Text>
        </div>
        <Button 
          size="xs"
          onClick={handleNewTask}
        >
          <Plus className="w-4 h-4 mr-1" />
          New Session
        </Button>
      </Flex>

      {/* Stats Overview */}
      <Grid numItemsSm={2} numItemsLg={4} className="gap-6 mb-8">
        <Card decoration="top" decorationColor="blue">
          <Text>Total Sessions</Text>
          <Flex className="mt-2">
            <Text className="text-3xl font-bold">{stats.total}</Text>
          </Flex>
        </Card>
        <Card decoration="top" decorationColor="emerald">
          <Text>Completed</Text>
          <Flex className="mt-2">
            <Text className="text-3xl font-bold">{stats.completed}</Text>
            <Badge color="emerald" size="xs">
              {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
            </Badge>
          </Flex>
        </Card>
        <Card decoration="top" decorationColor="blue">
          <Text>In Progress</Text>
          <Flex className="mt-2">
            <Text className="text-3xl font-bold">{stats.inProgress}</Text>
          </Flex>
        </Card>
        <Card decoration="top" decorationColor="gray">
          <Text>Pending</Text>
          <Flex className="mt-2">
            <Text className="text-3xl font-bold">{stats.pending}</Text>
          </Flex>
        </Card>
      </Grid>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <Text className="text-gray-500">No interview sessions found</Text>
            </div>
          </Card>
        ) : (
          tasks.map((task) => (
            <Card key={task.id}>
              <Flex>
                <div className="flex gap-4 flex-1">
                  {getStatusIcon(task.status)}
                  <div className="flex-1">
                    <Flex>
                      <Title className="text-base">{task.title}</Title>
                      <div className="flex gap-2">
                        <Badge color={getPriorityColor(task.priority)} size="xs">
                          {task.priority}
                        </Badge>
                        <Badge
                          color={
                            task.status === 'completed' ? 'emerald' :
                            task.status === 'in-progress' ? 'blue' :
                            'gray'
                          }
                          size="xs"
                        >
                          {task.status}
                        </Badge>
                      </div>
                    </Flex>
                    <Text className="mt-1">{task.description}</Text>
                    
                    {task.status !== 'completed' && task.progress > 0 && (
                      <div className="mt-3">
                        <Flex>
                          <Text className="text-xs text-gray-500">Progress</Text>
                          <Text className="text-xs text-gray-500">{Math.round(task.progress)}%</Text>
                        </Flex>
                        <ClientProgressBar value={task.progress} color="blue" className="mt-1" />
                      </div>
                    )}

                    <Flex className="mt-3">
                      <Text className="text-xs text-gray-500">
                        {task.assignee}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {formatDateTime(task.dueDate)}
                      </Text>
                    </Flex>
                  </div>
                </div>
                <div className="flex gap-2">
                  {task.status !== 'completed' && (
                    <Button 
                      size="xs" 
                      color="emerald"
                      onClick={() => handleCompleteTask(task.id)}
                    >
                      Complete
                    </Button>
                  )}
                  <Button 
                    size="xs" 
                    variant="secondary"
                    onClick={() => handleEditTask(task.id)}
                  >
                    View
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
