'use client';

import { DonutChart } from '@tremor/react';

interface DataPoint {
  [key: string]: string | number;
}

export default function ClientDonutChart({
  data,
  category,
  index,
  colors,
  className,
}: {
  data: DataPoint[];
  category: string;
  index: string;
  colors?: string[];
  className?: string;
}) {
  return (
    <DonutChart
      className={className}
      data={data}
      category={category}
      index={index}
      valueFormatter={(value) => value.toLocaleString()}
      colors={colors as any}
    />
  );
}
