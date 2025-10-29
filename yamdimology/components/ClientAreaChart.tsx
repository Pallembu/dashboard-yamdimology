'use client';

import { AreaChart } from '@tremor/react';

interface DataPoint {
  [key: string]: string | number;
}

export default function ClientAreaChart({
  data,
  index,
  categories,
  colors,
  className,
  yAxisWidth,
}: {
  data: DataPoint[];
  index: string;
  categories: string[];
  colors?: string[];
  className?: string;
  yAxisWidth?: number;
}) {
  return (
    <AreaChart
      className={className}
      data={data}
      index={index}
      categories={categories}
      colors={colors as any}
      valueFormatter={(value) => value.toLocaleString()}
      yAxisWidth={yAxisWidth}
    />
  );
}
