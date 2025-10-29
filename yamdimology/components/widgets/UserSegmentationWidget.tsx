'use client';

import { Card, Title, DonutChart, Legend } from '@tremor/react';

interface SegmentData {
  name: string;
  value: number;
}

interface Props {
  data: SegmentData[];
}

export default function UserSegmentationWidget({ data }: Props) {
  const valueFormatter = (number: number) => 
    `${number.toLocaleString()} users`;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <Title>Customer Segmentation</Title>
      <DonutChart
        className="mt-6"
        data={data}
        category="value"
        index="name"
        valueFormatter={valueFormatter}
        colors={['emerald', 'orange', 'blue', 'amber']}
        showAnimation={true}
      />
      <Legend
        className="mt-6"
        categories={data.map(item => item.name)}
        colors={['emerald', 'orange', 'blue', 'amber']}
      />
      <div className="mt-4 text-center">
        <p className="text-tremor-default text-tremor-content">
          Total Users: <span className="font-semibold">{total.toLocaleString()}</span>
        </p>
      </div>
    </Card>
  );
}
