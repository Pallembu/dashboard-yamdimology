'use client';

import { Card, Metric, Text, Flex, BadgeDelta } from '@tremor/react';
import { DollarSign } from 'lucide-react';

interface Props {
  totalRevenue: number;
  percentageChange: number;
}

export default function TotalRevenueWidget({ totalRevenue, percentageChange }: Props) {
  const isPositive = percentageChange >= 0;

  return (
    <Card decoration="top" decorationColor="blue">
      <Flex alignItems="start">
        <div className="flex-1">
          <Text>Total Revenue</Text>
          <Metric>${totalRevenue.toLocaleString()}</Metric>
        </div>
        <div className="p-3 bg-blue-100 rounded-lg">
          <DollarSign className="w-6 h-6 text-blue-600" />
        </div>
      </Flex>
      <Flex className="mt-4">
        <BadgeDelta 
          deltaType={isPositive ? 'moderateIncrease' : 'moderateDecrease'} 
          size="xs"
        >
          {isPositive ? '+' : ''}{percentageChange.toFixed(1)}% from last month
        </BadgeDelta>
      </Flex>
    </Card>
  );
}
