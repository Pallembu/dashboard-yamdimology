'use client';

import { Card, Metric, Text, Flex, BadgeDelta } from '@tremor/react';
import { FileText } from 'lucide-react';

interface Props {
  totalResumes: number;
}

export default function TotalResumesWidget({ totalResumes }: Props) {
  return (
    <Card decoration="top" decorationColor="amber">
      <Flex alignItems="start">
        <div className="flex-1">
          <Text>Total Resumes</Text>
          <Metric>{totalResumes.toLocaleString()}</Metric>
        </div>
        <div className="p-3 bg-amber-100 rounded-lg">
          <FileText className="w-6 h-6 text-amber-600" />
        </div>
      </Flex>
      <Flex className="mt-4">
        <Text className="text-xs text-gray-600">
          Total documents in collection
        </Text>
      </Flex>
    </Card>
  );
}
