'use client';

import { useState } from 'react';
import { Card, Title, Text, Badge, Flex, Button, Grid, Col, Metric } from '@tremor/react';
import { 
  Users, TrendingUp, DollarSign, FileText, Activity, 
  BarChart3, PieChart, LineChart, Settings, Eye, EyeOff 
} from 'lucide-react';

export default function WidgetsPage() {
  const [widgets, setWidgets] = useState([
    {
      id: 'realtime-users',
      name: 'Real-time Users',
      description: 'Live active user count with Firebase listener',
      icon: Users,
      category: 'Analytics',
      status: 'active',
      color: 'emerald',
      usageCount: 1245,
    },
    {
      id: 'session-overview',
      name: 'Session Overview',
      description: '7-day session trends with line chart visualization',
      icon: LineChart,
      category: 'Analytics',
      status: 'active',
      color: 'blue',
      usageCount: 987,
    },
    {
      id: 'user-segmentation',
      name: 'User Segmentation',
      description: 'User distribution by device type and category',
      icon: PieChart,
      category: 'Analytics',
      status: 'active',
      color: 'amber',
      usageCount: 856,
    },
    {
      id: 'total-revenue',
      name: 'Total Revenue',
      description: 'Revenue tracking with month-over-month trends',
      icon: DollarSign,
      category: 'Financial',
      status: 'active',
      color: 'blue',
      usageCount: 1432,
    },
    {
      id: 'system-health',
      name: 'System Health',
      description: 'Real-time system status monitoring',
      icon: Activity,
      category: 'System',
      status: 'active',
      color: 'emerald',
      usageCount: 2103,
    },
    {
      id: 'total-resumes',
      name: 'Total Resumes',
      description: 'Document count from resumes collection',
      icon: FileText,
      category: 'Content',
      status: 'active',
      color: 'amber',
      usageCount: 634,
    },
    {
      id: 'conversion-rate',
      name: 'Conversion Rate',
      description: 'Track conversion metrics and funnel performance',
      icon: TrendingUp,
      category: 'Analytics',
      status: 'inactive',
      color: 'gray',
      usageCount: 0,
    },
    {
      id: 'traffic-sources',
      name: 'Traffic Sources',
      description: 'Analyze traffic origin and referral sources',
      icon: BarChart3,
      category: 'Analytics',
      status: 'inactive',
      color: 'gray',
      usageCount: 0,
    },
  ]);

  const handleToggleWidget = (id: string) => {
    setWidgets(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, status: w.status === 'active' ? 'inactive' : 'active' }
          : w
      )
    );
  };

  const handleConfigureWidget = (id: string) => {
    alert(`Configure widget ${id}: This would open a configuration dialog`);
  };

  const handleGlobalConfigure = () => {
    alert('Global Configure: This would open widget settings');
  };

  const stats = {
    total: widgets.length,
    active: widgets.filter(w => w.status === 'active').length,
    inactive: widgets.filter(w => w.status === 'inactive').length,
    totalUsage: widgets.reduce((sum, w) => sum + w.usageCount, 0),
  };

  const categories = Array.from(new Set(widgets.map(w => w.category)));

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Flex className="mb-8">
        <div>
          <Title className="text-3xl font-bold text-gray-900">Widgets</Title>
          <Text className="text-gray-600 mt-2">Manage your dashboard widgets</Text>
        </div>
        <Button 
          size="xs"
          onClick={handleGlobalConfigure}
        >
          <Settings className="w-4 h-4 mr-1" />
          Configure
        </Button>
      </Flex>

      {/* Stats Overview */}
      <Grid numItemsSm={2} numItemsLg={4} className="gap-6 mb-8">
        <Card decoration="top" decorationColor="blue">
          <Text>Total Widgets</Text>
          <Metric>{stats.total}</Metric>
        </Card>
        <Card decoration="top" decorationColor="emerald">
          <Text>Active</Text>
          <Metric>{stats.active}</Metric>
        </Card>
        <Card decoration="top" decorationColor="gray">
          <Text>Inactive</Text>
          <Metric>{stats.inactive}</Metric>
        </Card>
        <Card decoration="top" decorationColor="amber">
          <Text>Total Usage</Text>
          <Metric>{stats.totalUsage.toLocaleString()}</Metric>
        </Card>
      </Grid>

      {/* Widgets by Category */}
      {categories.map(category => {
        const categoryWidgets = widgets.filter(w => w.category === category);
        
        return (
          <div key={category} className="mb-8">
            <Title className="mb-4">{category}</Title>
            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
              {categoryWidgets.map(widget => {
                const Icon = widget.icon;
                
                return (
                  <Card key={widget.id}>
                    <Flex>
                      <div className="flex gap-3 flex-1">
                        <div className={`p-3 rounded-lg h-fit ${
                          widget.status === 'active' 
                            ? `bg-${widget.color}-100` 
                            : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            widget.status === 'active'
                              ? `text-${widget.color}-600`
                              : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <Flex>
                            <Text className="font-semibold">{widget.name}</Text>
                            <Badge 
                              color={widget.status === 'active' ? 'emerald' : 'gray'} 
                              size="xs"
                            >
                              {widget.status}
                            </Badge>
                          </Flex>
                          <Text className="text-sm text-gray-600 mt-1">
                            {widget.description}
                          </Text>
                          <Flex className="mt-3">
                            <Text className="text-xs text-gray-500">
                              Usage: {widget.usageCount.toLocaleString()}
                            </Text>
                          </Flex>
                        </div>
                      </div>
                    </Flex>
                    
                    <Flex className="mt-4 gap-2">
                      {widget.status === 'active' ? (
                        <>
                          <Button 
                            size="xs" 
                            variant="secondary"
                            onClick={() => handleConfigureWidget(widget.id)}
                          >
                            <Settings className="w-3 h-3 mr-1" />
                            Configure
                          </Button>
                          <Button 
                            size="xs" 
                            variant="secondary" 
                            color="rose"
                            onClick={() => handleToggleWidget(widget.id)}
                          >
                            <EyeOff className="w-3 h-3 mr-1" />
                            Disable
                          </Button>
                        </>
                      ) : (
                        <Button 
                          size="xs" 
                          color="emerald"
                          onClick={() => handleToggleWidget(widget.id)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Enable
                        </Button>
                      )}
                    </Flex>
                  </Card>
                );
              })}
            </Grid>
          </div>
        );
      })}
    </div>
  );
}
