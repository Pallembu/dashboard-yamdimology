'use client';

import { LineChart } from '@tremor/react';

interface DataPoint {
  [key: string]: string | number;
}

export default function ClientLineChart({
  data,
  index,
  categories,
  colors,
  className,
  yAxisWidth,
  showLegend,
}: {
  data: DataPoint[];
  index: string;
  categories: string[];
  colors?: string[];
  className?: string;
  yAxisWidth?: number;
  showLegend?: boolean;
}) {
  return (
    <LineChart
      className={className}
      data={data}
      index={index}
      categories={categories}
      colors={colors as any}
      valueFormatter={(value) => value.toLocaleString()}
      yAxisWidth={yAxisWidth}
      showLegend={showLegend}
    />
  );
}
