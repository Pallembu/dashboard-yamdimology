'use client';

import { useState } from 'react';
import { Card, Title, Text, Grid, Col, Flex, Badge, Button } from '@tremor/react';
import { 
  CheckCircle2, XCircle, Clock, Settings, 
  Mail, Database, Cloud, Smartphone, Code, Webhook 
} from 'lucide-react';

export default function IntegrationPage() {
  const [integrations, setIntegrations] = useState([
    {
      id: 'firebase',
      name: 'Firebase',
      description: 'Cloud database and authentication service',
      icon: Database,
      status: 'connected',
      statusText: 'Connected',
      color: 'emerald',
      lastSync: '2 minutes ago',
      dataPoints: '15,420',
    },
    {
      id: 'sendgrid',
      name: 'SendGrid',
      description: 'Email delivery and marketing platform',
      icon: Mail,
      status: 'connected',
      statusText: 'Connected',
      color: 'emerald',
      lastSync: '5 minutes ago',
      dataPoints: '3,245',
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Web analytics and reporting',
      icon: Cloud,
      status: 'pending',
      statusText: 'Pending Setup',
      color: 'amber',
      lastSync: 'Never',
      dataPoints: '0',
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Payment processing platform',
      icon: Code,
      status: 'connected',
      statusText: 'Connected',
      color: 'emerald',
      lastSync: '1 hour ago',
      dataPoints: '1,823',
    },
    {
      id: 'twilio',
      name: 'Twilio',
      description: 'SMS and communication APIs',
      icon: Smartphone,
      status: 'disconnected',
      statusText: 'Disconnected',
      color: 'rose',
      lastSync: '3 days ago',
      dataPoints: '0',
    },
    {
      id: 'webhooks',
      name: 'Custom Webhooks',
      description: 'Custom webhook integrations',
      icon: Webhook,
      status: 'connected',
      statusText: 'Connected',
      color: 'emerald',
      lastSync: '10 minutes ago',
      dataPoints: '892',
    },
  ]);

  const handleDisconnect = (id: string) => {
    if (confirm('Are you sure you want to disconnect this integration?')) {
      setIntegrations(prev =>
        prev.map(i => i.id === id ? { ...i, status: 'disconnected', statusText: 'Disconnected', color: 'rose' } : i)
      );
    }
  };

  const handleReconnect = (id: string) => {
    setIntegrations(prev =>
      prev.map(i => i.id === id ? { ...i, status: 'connected', statusText: 'Connected', color: 'emerald' } : i)
    );
  };

  const handleConfigure = (id: string) => {
    alert(`Configure ${id}: This would open integration settings`);
  };

  const handleCompleteSetup = (id: string) => {
    alert(`Complete Setup ${id}: This would start the setup wizard`);
  };

  const stats = {
    total: integrations.length,
    connected: integrations.filter(i => i.status === 'connected').length,
    pending: integrations.filter(i => i.status === 'pending').length,
    disconnected: integrations.filter(i => i.status === 'disconnected').length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'disconnected':
        return <XCircle className="w-5 h-5 text-rose-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <Title className="text-3xl font-bold text-gray-900">Integrations</Title>
        <Text className="text-gray-600 mt-2">Manage your third-party integrations</Text>
      </div>

      {/* Stats Overview */}
      <Grid numItemsSm={2} numItemsLg={4} className="gap-6 mb-8">
        <Card decoration="top" decorationColor="blue">
          <Text>Total Integrations</Text>
          <Text className="text-3xl font-bold mt-2">{stats.total}</Text>
        </Card>
        <Card decoration="top" decorationColor="emerald">
          <Flex>
            <Text>Connected</Text>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </Flex>
          <Text className="text-3xl font-bold mt-2">{stats.connected}</Text>
        </Card>
        <Card decoration="top" decorationColor="amber">
          <Flex>
            <Text>Pending</Text>
            <Clock className="w-5 h-5 text-amber-600" />
          </Flex>
          <Text className="text-3xl font-bold mt-2">{stats.pending}</Text>
        </Card>
        <Card decoration="top" decorationColor="rose">
          <Flex>
            <Text>Disconnected</Text>
            <XCircle className="w-5 h-5 text-rose-600" />
          </Flex>
          <Text className="text-3xl font-bold mt-2">{stats.disconnected}</Text>
        </Card>
      </Grid>

      {/* Integrations Grid */}
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {integrations.map(integration => {
          const Icon = integration.icon;
          
          return (
            <Card key={integration.id}>
              <Flex alignItems="start">
                <div className="flex gap-4 flex-1">
                  <div className={`p-3 rounded-lg h-fit ${
                    integration.status === 'connected' ? 'bg-emerald-100' :
                    integration.status === 'pending' ? 'bg-amber-100' :
                    'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      integration.status === 'connected' ? 'text-emerald-600' :
                      integration.status === 'pending' ? 'text-amber-600' :
                      'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <Flex>
                      <Text className="font-semibold text-base">{integration.name}</Text>
                      {getStatusIcon(integration.status)}
                    </Flex>
                    <Text className="text-sm text-gray-600 mt-1">
                      {integration.description}
                    </Text>
                  </div>
                </div>
              </Flex>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <Grid numItemsSm={2} className="gap-4 mb-4">
                  <div>
                    <Text className="text-xs text-gray-500">Status</Text>
                    <Badge color={integration.color} size="xs" className="mt-1">
                      {integration.statusText}
                    </Badge>
                  </div>
                  <div>
                    <Text className="text-xs text-gray-500">Last Sync</Text>
                    <Text className="text-sm font-medium mt-1">{integration.lastSync}</Text>
                  </div>
                  <div>
                    <Text className="text-xs text-gray-500">Data Points</Text>
                    <Text className="text-sm font-medium mt-1">{integration.dataPoints}</Text>
                  </div>
                </Grid>

                <Flex className="gap-2">
                  {integration.status === 'connected' ? (
                    <>
                      <Button 
                        size="xs" 
                        variant="secondary"
                        onClick={() => handleConfigure(integration.id)}
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        Configure
                      </Button>
                      <Button 
                        size="xs" 
                        variant="secondary" 
                        color="rose"
                        onClick={() => handleDisconnect(integration.id)}
                      >
                        Disconnect
                      </Button>
                    </>
                  ) : integration.status === 'pending' ? (
                    <Button 
                      size="xs" 
                      color="blue"
                      onClick={() => handleCompleteSetup(integration.id)}
                    >
                      Complete Setup
                    </Button>
                  ) : (
                    <Button 
                      size="xs" 
                      color="emerald"
                      onClick={() => handleReconnect(integration.id)}
                    >
                      Reconnect
                    </Button>
                  )}
                </Flex>
              </div>
            </Card>
          );
        })}
      </Grid>

      {/* Integration Health */}
      <Card className="mt-8">
        <Title>Integration Health</Title>
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
          <div>
            <Flex>
              <Text className="text-gray-600">API Uptime</Text>
              <Badge color="emerald" size="xs">99.9%</Badge>
            </Flex>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '99.9%' }} />
            </div>
          </div>
          <div>
            <Flex>
              <Text className="text-gray-600">Sync Success Rate</Text>
              <Badge color="emerald" size="xs">98.5%</Badge>
            </Flex>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '98.5%' }} />
            </div>
          </div>
          <div>
            <Flex>
              <Text className="text-gray-600">Average Response Time</Text>
              <Text className="font-semibold">142ms</Text>
            </Flex>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
        </Grid>
      </Card>
    </div>
  );
}
