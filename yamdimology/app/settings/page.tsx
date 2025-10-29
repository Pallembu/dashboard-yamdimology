'use client';

import { useState } from 'react';
import { Card, Title, Text, Grid, Col, Button, Flex, Badge, Switch, Select, SelectItem, TextInput } from '@tremor/react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Mail,
  Globe,
  Save
} from 'lucide-react';

export default function SettingsPage() {
  const [selectedCategory, setSelectedCategory] = useState('profile');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  const settingsCategories = [
    {
      id: 'profile',
      name: 'Profile Settings',
      icon: User,
      color: 'blue',
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: Bell,
      color: 'amber',
    },
    {
      id: 'security',
      name: 'Security',
      icon: Shield,
      color: 'emerald',
    },
    {
      id: 'appearance',
      name: 'Appearance',
      icon: Palette,
      color: 'purple',
    },
    {
      id: 'data',
      name: 'Data & Privacy',
      icon: Database,
      color: 'rose',
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <Title className="text-3xl font-bold text-gray-900">Settings</Title>
        <Text className="text-gray-600 mt-2">Manage your application settings and preferences</Text>
      </div>

      <Grid numItemsLg={3} className="gap-6">
        {/* Sidebar Navigation */}
        <Col>
          <Card>
            <Title>Categories</Title>
            <div className="mt-4 space-y-2">
              {settingsCategories.map(category => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      isActive ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg bg-${category.color}-100`}>
                      <Icon className={`w-5 h-5 text-${category.color}-600`} />
                    </div>
                    <Text className="font-medium">{category.name}</Text>
                  </button>
                );
              })}
            </div>
          </Card>
        </Col>

        {/* Settings Content */}
        <Col numColSpan={2}>
          {/* Profile Settings */}
          <Card className="mb-6">
            <Flex>
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 text-blue-600" />
                <Title>Profile Settings</Title>
              </div>
              <Badge color="blue">Active</Badge>
            </Flex>
            
            <div className="mt-6 space-y-4">
              <div>
                <Text className="mb-2">Full Name</Text>
                <TextInput placeholder="Enter your full name" defaultValue="Admin User" />
              </div>
              <div>
                <Text className="mb-2">Email Address</Text>
                <TextInput type="email" placeholder="email@example.com" defaultValue="admin@yamdimology.com" />
              </div>
              <div>
                <Text className="mb-2">Company</Text>
                <TextInput placeholder="Company name" defaultValue="Yamdimology" />
              </div>
              <div>
                <Text className="mb-2">Role</Text>
                <Select defaultValue="admin">
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </Select>
              </div>
            </div>

            <Flex className="mt-6 gap-2">
              <Button size="xs" onClick={handleSaveSettings}>
                <Save className="w-3 h-3 mr-1" />
                Save Changes
              </Button>
              <Button size="xs" variant="secondary" onClick={() => alert('Changes cancelled')}>
                Cancel
              </Button>
            </Flex>
          </Card>

          {/* Notification Settings */}
          <Card className="mb-6">
            <Flex>
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-amber-600" />
                <Title>Notification Preferences</Title>
              </div>
            </Flex>

            <div className="mt-6 space-y-4">
              <Flex>
                <div>
                  <Text className="font-medium">Email Notifications</Text>
                  <Text className="text-sm text-gray-600">Receive email updates about your activity</Text>
                </div>
                <Switch checked={emailNotifications} onChange={setEmailNotifications} />
              </Flex>
              
              <Flex>
                <div>
                  <Text className="font-medium">Push Notifications</Text>
                  <Text className="text-sm text-gray-600">Get push notifications on your device</Text>
                </div>
                <Switch checked={pushNotifications} onChange={setPushNotifications} />
              </Flex>

              <Flex>
                <div>
                  <Text className="font-medium">SMS Notifications</Text>
                  <Text className="text-sm text-gray-600">Receive SMS alerts</Text>
                </div>
                <Switch checked={smsNotifications} onChange={setSmsNotifications} />
              </Flex>
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="mb-6">
            <Flex>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-emerald-600" />
                <Title>Security Settings</Title>
              </div>
              <Badge color="emerald">Secure</Badge>
            </Flex>

            <div className="mt-6 space-y-4">
              <Flex>
                <div>
                  <Text className="font-medium">Two-Factor Authentication</Text>
                  <Text className="text-sm text-gray-600">Add an extra layer of security</Text>
                </div>
                <Switch defaultChecked />
              </Flex>

              <Flex>
                <div>
                  <Text className="font-medium">Session Timeout</Text>
                  <Text className="text-sm text-gray-600">Auto-logout after inactivity</Text>
                </div>
                <Select defaultValue="30" className="w-32">
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </Select>
              </Flex>

              <div>
                <Button 
                  size="xs" 
                  variant="secondary" 
                  color="rose"
                  onClick={() => alert('Change Password: This will open a password change dialog')}
                >
                  Change Password
                </Button>
              </div>
            </div>
          </Card>

          {/* Appearance Settings */}
          <Card className="mb-6">
            <Flex>
              <div className="flex items-center gap-3">
                <Palette className="w-6 h-6 text-purple-600" />
                <Title>Appearance</Title>
              </div>
            </Flex>

            <div className="mt-6 space-y-4">
              <div>
                <Text className="mb-2 font-medium">Theme</Text>
                <Select defaultValue="light">
                  <SelectItem value="light">Light Mode</SelectItem>
                  <SelectItem value="dark">Dark Mode</SelectItem>
                  <SelectItem value="auto">Auto (System)</SelectItem>
                </Select>
              </div>

              <div>
                <Text className="mb-2 font-medium">Sidebar Position</Text>
                <Select defaultValue="left">
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </Select>
              </div>

              <Flex>
                <div>
                  <Text className="font-medium">Compact Mode</Text>
                  <Text className="text-sm text-gray-600">Reduce spacing for more content</Text>
                </div>
                <Switch />
              </Flex>
            </div>
          </Card>

          {/* Data & Privacy */}
          <Card>
            <Flex>
              <div className="flex items-center gap-3">
                <Database className="w-6 h-6 text-rose-600" />
                <Title>Data & Privacy</Title>
              </div>
            </Flex>

            <div className="mt-6 space-y-4">
              <Flex>
                <div>
                  <Text className="font-medium">Data Collection</Text>
                  <Text className="text-sm text-gray-600">Allow anonymous usage analytics</Text>
                </div>
                <Switch defaultChecked />
              </Flex>

              <Flex>
                <div>
                  <Text className="font-medium">Third-party Sharing</Text>
                  <Text className="text-sm text-gray-600">Share data with integrated services</Text>
                </div>
                <Switch defaultChecked />
              </Flex>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <Button 
                    size="xs" 
                    variant="secondary"
                    onClick={() => alert('Export Data: Your data export will be prepared and sent to your email')}
                  >
                    Export Data
                  </Button>
                  <Button 
                    size="xs" 
                    variant="secondary" 
                    color="rose"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                        alert('Account deletion initiated');
                      }
                    }}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* API Settings */}
          <Card className="mt-6">
            <Flex>
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-blue-600" />
                <Title>API Configuration</Title>
              </div>
              <Badge color="blue">Active</Badge>
            </Flex>

            <div className="mt-6 space-y-4">
              <div>
                <Flex className="mb-2">
                  <Text className="font-medium">API Key</Text>
                  <Button 
                    size="xs" 
                    variant="secondary"
                    onClick={() => {
                      if (confirm('Are you sure you want to regenerate your API key? The old key will stop working immediately.')) {
                        alert('New API key generated successfully');
                      }
                    }}
                  >
                    Regenerate
                  </Button>
                </Flex>
                <div className="p-3 bg-gray-100 rounded-lg font-mono text-sm">
                  ya_live_sk_••••••••••••••••••••••••
                </div>
              </div>

              <Flex>
                <div>
                  <Text className="font-medium">API Rate Limit</Text>
                  <Text className="text-sm text-gray-600">1000 requests per hour</Text>
                </div>
                <Badge color="emerald">Normal</Badge>
              </Flex>

              <div>
                <Button 
                  size="xs" 
                  variant="secondary"
                  onClick={() => alert('Opening API Documentation...')}
                >
                  View API Documentation
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Grid>
    </div>
  );
}
