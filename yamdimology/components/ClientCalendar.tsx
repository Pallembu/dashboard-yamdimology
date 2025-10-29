'use client';

import { useState } from 'react';
import { Card, Title, Text, Badge, Flex, Button, Grid, Col } from '@tremor/react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { formatDateTime, formatShortDate } from '@/lib/dateUtils';

interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
  description: string;
}

interface ClientCalendarProps {
  initialEvents: Event[];
}

function generateCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];
  
  // Add empty cells for days before the month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }
  
  return days;
}

export default function ClientCalendar({ initialEvents }: ClientCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const events = initialEvents;

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const days = generateCalendarDays(currentYear, currentMonth);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleNewEvent = () => {
    alert('New Event: In production, this would create a new interview session');
  };

  const getEventColor = (type: string): 'blue' | 'emerald' | 'amber' | 'gray' | 'rose' => {
    switch (type) {
      case 'completed':
        return 'emerald';
      case 'scheduled':
        return 'blue';
      case 'cancelled':
        return 'rose';
      default:
        return 'gray';
    }
  };

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const now = new Date();
  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= now)
    .slice(0, 10);

  return (
    <>
      <Flex className="mb-8">
        <Text className="text-sm text-gray-500">
          {events.length} interview session{events.length !== 1 ? 's' : ''}
        </Text>
        <Button 
          size="xs"
          onClick={handleNewEvent}
        >
          <Plus className="w-4 h-4 mr-1" />
          New Session
        </Button>
      </Flex>

      <Grid numItemsLg={3} className="gap-6">
        {/* Calendar View */}
        <Col numColSpanLg={2}>
          <Card>
            <Flex className="mb-6">
              <Title>{monthName}</Title>
              <div className="flex gap-2">
                <Button 
                  size="xs" 
                  variant="secondary"
                  onClick={handlePreviousMonth}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button 
                  size="xs" 
                  variant="secondary"
                  onClick={handleToday}
                >
                  Today
                </Button>
                <Button 
                  size="xs" 
                  variant="secondary"
                  onClick={handleNextMonth}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Flex>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
              
              {days.map((day, index) => {
                const dayEvents = day ? getEventsForDay(day) : [];
                const isToday = day && day.toDateString() === now.toDateString();
                
                return (
                  <div
                    key={index}
                    className={`min-h-24 border rounded-lg p-2 ${
                      day ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'
                    } ${isToday ? 'border-blue-500 border-2' : 'border-gray-200'}`}
                  >
                    {day && (
                      <>
                        <div className={`text-sm mb-1 ${isToday ? 'font-bold text-blue-600' : 'text-gray-700'}`}>
                          {day.getDate()}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs px-1 py-0.5 rounded truncate ${
                                event.type === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                                event.type === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                                event.type === 'cancelled' ? 'bg-rose-100 text-rose-700' :
                                'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>

        {/* Upcoming Events Sidebar */}
        <Col>
          <Card>
            <Title>Upcoming Sessions</Title>
            <div className="mt-6 space-y-4">
              {upcomingEvents.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <Text className="text-gray-500">No upcoming sessions</Text>
                </div>
              ) : (
                upcomingEvents.map((event) => (
                  <div key={event.id} className="border-l-4 border-l-blue-500 pl-3 py-2">
                    <Flex>
                      <Text className="font-semibold">{event.title}</Text>
                      <Badge color={getEventColor(event.type)} size="xs">
                        {event.type}
                      </Badge>
                    </Flex>
                    <Text className="text-sm text-gray-600 mt-1">
                      {event.description}
                    </Text>
                    <Text className="text-xs text-gray-500 mt-2">
                      {formatDateTime(event.date)}
                    </Text>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Event Stats */}
          <Card className="mt-6">
            <Title>Session Summary</Title>
            <div className="mt-4 space-y-3">
              <Flex>
                <Text>Total Sessions</Text>
                <Text className="font-semibold">{events.length}</Text>
              </Flex>
              <Flex>
                <Text>This Month</Text>
                <Text className="font-semibold">
                  {events.filter((e) => {
                    const eventDate = new Date(e.date);
                    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
                  }).length}
                </Text>
              </Flex>
              <Flex>
                <Text>Upcoming</Text>
                <Text className="font-semibold">{upcomingEvents.length}</Text>
              </Flex>
            </div>
          </Card>
        </Col>
      </Grid>
    </>
  );
}
