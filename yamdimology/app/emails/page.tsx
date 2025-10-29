import { Card, Title, Text } from '@tremor/react';
import { Mail } from 'lucide-react';

export default function EmailsPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <Title className="text-3xl font-bold text-gray-900">Email Campaigns</Title>
        <Text className="text-gray-600 mt-2">Email campaign analytics</Text>
      </div>

      <Card>
        <div className="text-center py-24">
          <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <Title className="text-gray-500 mb-2">Email Campaigns Not Available</Title>
          <Text className="text-gray-400">
            This feature requires email campaign integration. Configure your email service provider to view campaign analytics.
          </Text>
        </div>
      </Card>
    </div>
  );
}
