'use client';

import { Card, Title, LineChart } from '@tremor/react';

interface SessionData {
  date: string;
  sessions: number;
}

interface Props {
  data: SessionData[];
}

export default function SessionOverviewWidget({ data }: Props) {
  const chartData = data.map(item => ({
    date: item.date,
    'Sessions': item.sessions,
  }));

  return (
    <Card>
      <Title>Session Overview</Title>
      <LineChart
        className="mt-6 h-72"
        data={chartData}
        index="date"
        categories={['Sessions']}
        colors={['emerald']}
        valueFormatter={(value) => value.toLocaleString()}
        yAxisWidth={48}
        showLegend={false}
      />
    </Card>
  );
}
