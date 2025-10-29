import { Grid, Col, Title, Text, Card, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Metric, Flex, Badge } from '@tremor/react';
import { getAdminDb } from '@/firebase/adminConfig';
import RealtimeUsersWidget from '@/components/widgets/RealtimeUsersWidget';
import SessionOverviewWidget from '@/components/widgets/SessionOverviewWidget';
import UserSegmentationWidget from '@/components/widgets/UserSegmentationWidget';
import TotalRevenueWidget from '@/components/widgets/TotalRevenueWidget';
import SystemHealthWidget from '@/components/widgets/SystemHealthWidget';
import TotalResumesWidget from '@/components/widgets/TotalResumesWidget';
import ClientDonutChart from '@/components/ClientDonutChart';
import RecentUsersTable from '@/components/RecentUsersTable';
import RecentLoginsTable from '@/components/RecentLoginsTable';
import { Users, TrendingUp, Activity } from 'lucide-react';
import { getCurrentDateTime } from '@/lib/dateUtils';

async function getDashboardData() {
  const db = getAdminDb();

  try {
    // Fetch session data for the last 7 days
    const sessionsSnapshot = await db.collection('analytics_sessions').get();
    const sessionsByDate: { [key: string]: number } = {};
    
    sessionsSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      const date = data.timestamp?.toDate?.() || data.date || new Date();
      const dateKey = new Date(date).toISOString().split('T')[0];
      sessionsByDate[dateKey] = (sessionsByDate[dateKey] || 0) + 1;
    });

    // Get last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    const sessionData = last7Days.map(date => {
      const d = new Date(date + 'T00:00:00Z'); // Force UTC
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[d.getUTCMonth()];
      const day = d.getUTCDate();
      return {
        date: `${month} ${day}`,
        sessions: sessionsByDate[date] || 0,
      };
    });

    // Fetch user segmentation data
    const usersSnapshot = await db.collection('analytics_users').get();
    const segmentCounts: { [key: string]: number } = {};
    
    usersSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      const segment = data.deviceType || data.userType || 'Unknown';
      segmentCounts[segment] = (segmentCounts[segment] || 0) + 1;
    });

    const userSegmentation = Object.entries(segmentCounts).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));

    // Fetch total revenue from payments (CORRECTED: only completed/success payments)
    const paymentsSnapshot = await db.collection('payments').get();
    let totalRevenue = 0;
    let lastMonthRevenue = 0;
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    paymentsSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      const status = data.status || '';
      
      // Only sum completed or success payments
      if (status === 'completed' || status === 'success') {
        const amount = parseFloat(data.totalPayment) || parseFloat(data.amount) || 0;
        totalRevenue += amount;

        const paymentDate = data.completedAt?.toDate?.() || data.createdAt?.toDate?.() || new Date();
        if (paymentDate >= lastMonth && paymentDate < currentMonth) {
          lastMonthRevenue += amount;
        }
      }
    });

    const currentMonthRevenue = totalRevenue - lastMonthRevenue;
    const percentageChange = lastMonthRevenue > 0 
      ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
      : 0;

    // Fetch system health status
    const systemSnapshot = await db.collection('analytics_system').limit(1).get();
    let systemStatus: 'operational' | 'error' | 'warning' = 'operational';
    let systemMessage = 'All systems running smoothly';
    let lastUpdated = getCurrentDateTime();

    if (!systemSnapshot.empty) {
      const systemData = systemSnapshot.docs[0].data();
      systemStatus = systemData.status || 'operational';
      systemMessage = systemData.message || systemMessage;
      const timestamp = systemData.timestamp?.toDate?.() || systemData.lastUpdated?.toDate?.();
      if (timestamp) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[timestamp.getUTCMonth()];
        const day = timestamp.getUTCDate();
        const year = timestamp.getUTCFullYear();
        const hours = timestamp.getUTCHours().toString().padStart(2, '0');
        const minutes = timestamp.getUTCMinutes().toString().padStart(2, '0');
        const seconds = timestamp.getUTCSeconds().toString().padStart(2, '0');
        lastUpdated = `${month} ${day}, ${year}, ${hours}:${minutes}:${seconds} UTC`;
      }
    }

    // Fetch total resumes count
    const resumesSnapshot = await db.collection('resumes').count().get();
    const totalResumes = resumesSnapshot.data().count;

    // NEW: Fetch total answers from test_results collection
    const testResultsSnapshot = await db.collection('test_results').count().get();
    const totalAnswers = testResultsSnapshot.data().count;

    // NEW: Fetch users data for engagement analysis
    const allUsersSnapshot = await db.collection('users').get();
    const allUsers: any[] = [];
    
    allUsersSnapshot.forEach((doc) => {
      allUsers.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Recent registrations (last 5 users)
    const recentUsers = allUsers
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5)
      .map(user => ({
        email: user.email || 'N/A',
        createdAt: user.createdAt || '',
      }));

    // NEW: Recent logins (last 5 users by lastLoginAt)
    const recentLogins = allUsers
      .filter(u => u.lastLoginAt) // Only users with lastLoginAt
      .sort((a, b) => {
        const dateA = a.lastLoginAt?.toDate?.() || new Date(a.lastLoginAt || 0);
        const dateB = b.lastLoginAt?.toDate?.() || new Date(b.lastLoginAt || 0);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5)
      .map(user => ({
        userId: user.uid || user.id || 'N/A',
        lastLoginAt: user.lastLoginAt,
      }));

    // Balance KPIs
    const totalUsers = allUsers.length;
    
    // NEW: Resume adoption percentage
    const resumeAdoptionPercentage = totalUsers > 0 
      ? (totalResumes / totalUsers) * 100 
      : 0;
    
    const premiumUsers = allUsers.filter(u => (u.minutesBalance || 0) > 5).length;
    const unusedTrialUsers = allUsers.filter(u => (u.minutesBalance || 0) === 5).length;
    const activeTrialUsers = allUsers.filter(u => {
      const balance = u.minutesBalance || 0;
      return balance > 0 && balance < 3;
    }).length;

    // Trial adoption calculation
    const usedTrialUsers = allUsers.filter(u => (u.minutesBalance || 0) < 5).length;
    const trialAdoptionPercentage = totalUsers > 0 
      ? (usedTrialUsers / totalUsers) * 100 
      : 0;

    const trialAdoptionData = [
      {
        name: 'Used Trial',
        value: usedTrialUsers,
      },
      {
        name: 'Unused Trial',
        value: totalUsers - usedTrialUsers,
      },
    ];

    return {
      sessionData,
      userSegmentation,
      totalRevenue,
      percentageChange,
      systemStatus,
      systemMessage,
      lastUpdated,
      totalResumes,
      // User engagement data
      recentUsers,
      premiumUsers,
      unusedTrialUsers,
      activeTrialUsers,
      totalUsers,
      trialAdoptionPercentage,
      trialAdoptionData,
      // NEW: Additional metrics
      totalAnswers,
      resumeAdoptionPercentage,
      recentLogins,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      sessionData: [],
      userSegmentation: [],
      totalRevenue: 0,
      percentageChange: 0,
      systemStatus: 'error' as const,
      systemMessage: 'Error loading system data',
      lastUpdated: getCurrentDateTime(),
      totalResumes: 0,
      // Default user engagement data
      recentUsers: [],
      premiumUsers: 0,
      unusedTrialUsers: 0,
      activeTrialUsers: 0,
      totalUsers: 0,
      trialAdoptionPercentage: 0,
      trialAdoptionData: [],
      // NEW: Default additional metrics
      totalAnswers: 0,
      resumeAdoptionPercentage: 0,
      recentLogins: [],
    };
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <Title className="text-3xl font-bold text-gray-900">Dashboard</Title>
        <Text className="text-gray-600 mt-2">Welcome to your analytics overview</Text>
      </div>

      {/* Key Metrics Section - Top Priority */}
      <div className="mb-8">
        <Title className="text-2xl font-bold text-gray-900 mb-6">Key Metrics</Title>
        
        <Grid numItemsLg={4} className="gap-6 mb-6">
          {/* Widget 1: Total Revenue */}
          <Col>
            <Card decoration="top" decorationColor="emerald">
              <Title>Total Revenue</Title>
              <Text className="text-gray-600 mt-2">Completed payments</Text>
              <Metric className="mt-4 text-3xl font-bold text-emerald-600">
                Rp {data.totalRevenue.toLocaleString('id-ID')}
              </Metric>
              <Flex className="mt-4">
                <Badge color="emerald">Verified</Badge>
              </Flex>
            </Card>
          </Col>

          {/* Widget 2: Total Answers Generated */}
          <Col>
            <Card decoration="top" decorationColor="blue">
              <Title>Total Answers</Title>
              <Text className="text-gray-600 mt-2">Test results</Text>
              <Metric className="mt-4 text-3xl font-bold text-blue-600">
                {data.totalAnswers.toLocaleString('id-ID')}
              </Metric>
              <Flex className="mt-4">
                <Badge color="blue">Live</Badge>
              </Flex>
            </Card>
          </Col>

          {/* Widget 3: Resume Adoption */}
          <Col>
            <Card decoration="top" decorationColor="indigo">
              <Title>Resume Adoption</Title>
              <Text className="text-gray-600 mt-2">Upload rate</Text>
              <Metric className="mt-4 text-3xl font-bold text-indigo-600">
                {data.resumeAdoptionPercentage.toFixed(1)}%
              </Metric>
              <Flex className="mt-4">
                <Badge color="indigo">{data.totalResumes} / {data.totalUsers}</Badge>
              </Flex>
            </Card>
          </Col>

          {/* Widget 4: Trial Adoption */}
          <Col>
            <Card decoration="top" decorationColor="violet">
              <Title>Trial Adoption</Title>
              <Text className="text-gray-600 mt-2">Users used trial</Text>
              <Metric className="mt-4 text-3xl font-bold text-violet-600">
                {data.trialAdoptionPercentage.toFixed(1)}%
              </Metric>
              <Flex className="mt-4">
                <Badge color="violet">{data.totalUsers} users</Badge>
              </Flex>
            </Card>
          </Col>
        </Grid>

        {/* Analytics Metrics Table */}
        <Card>
          <Title>Analytics Metrics Overview</Title>
          <Table className="mt-6">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Metric</TableHeaderCell>
                <TableHeaderCell>Value</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Text className="font-medium">Total Revenue</Text>
                </TableCell>
                <TableCell>
                  <Text className="font-semibold text-emerald-600">
                    Rp {data.totalRevenue.toLocaleString('id-ID')}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge color="emerald">Financial</Badge>
                </TableCell>
                <TableCell>
                  <Badge color="emerald">Active</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Text className="font-medium">Total Users</Text>
                </TableCell>
                <TableCell>
                  <Text className="font-semibold text-blue-600">
                    {data.totalUsers.toLocaleString('id-ID')}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge color="blue">User Base</Badge>
                </TableCell>
                <TableCell>
                  <Badge color="blue">Active</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Text className="font-medium">Total Resumes</Text>
                </TableCell>
                <TableCell>
                  <Text className="font-semibold text-indigo-600">
                    {data.totalResumes.toLocaleString('id-ID')}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge color="indigo">Content</Badge>
                </TableCell>
                <TableCell>
                  <Badge color="indigo">Active</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Text className="font-medium">Total Answers</Text>
                </TableCell>
                <TableCell>
                  <Text className="font-semibold text-violet-600">
                    {data.totalAnswers.toLocaleString('id-ID')}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge color="violet">Engagement</Badge>
                </TableCell>
                <TableCell>
                  <Badge color="violet">Active</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Text className="font-medium">Resume Adoption Rate</Text>
                </TableCell>
                <TableCell>
                  <Text className="font-semibold text-indigo-600">
                    {data.resumeAdoptionPercentage.toFixed(1)}%
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge color="indigo">Conversion</Badge>
                </TableCell>
                <TableCell>
                  <Badge color="indigo">Active</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Text className="font-medium">Trial Adoption Rate</Text>
                </TableCell>
                <TableCell>
                  <Text className="font-semibold text-violet-600">
                    {data.trialAdoptionPercentage.toFixed(1)}%
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge color="violet">Conversion</Badge>
                </TableCell>
                <TableCell>
                  <Badge color="violet">Active</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Text className="font-medium">Premium Users</Text>
                </TableCell>
                <TableCell>
                  <Text className="font-semibold text-emerald-600">
                    {data.premiumUsers.toLocaleString('id-ID')}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge color="emerald">User Segment</Badge>
                </TableCell>
                <TableCell>
                  <Badge color="emerald">Active</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Text className="font-medium">Unused Trial Users</Text>
                </TableCell>
                <TableCell>
                  <Text className="font-semibold text-blue-600">
                    {data.unusedTrialUsers.toLocaleString('id-ID')}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge color="blue">User Segment</Badge>
                </TableCell>
                <TableCell>
                  <Badge color="amber">Opportunity</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Text className="font-medium">Active Trial Users</Text>
                </TableCell>
                <TableCell>
                  <Text className="font-semibold text-amber-600">
                    {data.activeTrialUsers.toLocaleString('id-ID')}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge color="amber">User Segment</Badge>
                </TableCell>
                <TableCell>
                  <Badge color="emerald">Engaged</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Charts & Widgets Section */}
      <div className="mb-8">
        <Title className="text-2xl font-bold text-gray-900 mb-6">Charts & Visualizations</Title>
        
        <Grid numItemsLg={2} className="gap-6 mb-6">
          {/* Resume Adoption Donut */}
          <Col>
            <Card>
              <Title>Resume Adoption Breakdown</Title>
              <div className="mt-6">
                <ClientDonutChart
                  data={[
                    { name: 'Uploaded', value: data.totalResumes },
                    { name: 'Not Uploaded', value: data.totalUsers - data.totalResumes },
                  ]}
                  category="value"
                  index="name"
                  colors={['indigo', 'gray']}
                  className="h-52"
                />
                <div className="mt-6 space-y-2 border-t pt-4">
                  <Flex>
                    <Text className="text-sm font-medium">With Resume</Text>
                    <Text className="text-sm font-semibold text-indigo-600">
                      {data.totalResumes} users
                    </Text>
                  </Flex>
                  <Flex>
                    <Text className="text-sm font-medium">Without Resume</Text>
                    <Text className="text-sm font-semibold text-gray-600">
                      {data.totalUsers - data.totalResumes} users
                    </Text>
                  </Flex>
                </div>
              </div>
            </Card>
          </Col>

          {/* Trial Adoption Donut */}
          <Col>
            <Card>
              <Title>Trial Usage Breakdown</Title>
              <div className="mt-6">
                <ClientDonutChart
                  data={data.trialAdoptionData}
                  category="value"
                  index="name"
                  colors={['violet', 'gray']}
                  className="h-52"
                />
                <div className="mt-6 space-y-2 border-t pt-4">
                  <Flex>
                    <Text className="text-sm font-medium">Used Trial</Text>
                    <Text className="text-sm font-semibold text-violet-600">
                      {data.trialAdoptionData[0]?.value || 0} users
                    </Text>
                  </Flex>
                  <Flex>
                    <Text className="text-sm font-medium">Unused Trial</Text>
                    <Text className="text-sm font-semibold text-gray-600">
                      {data.trialAdoptionData[1]?.value || 0} users
                    </Text>
                  </Flex>
                </div>
              </div>
            </Card>
          </Col>
        </Grid>
      </div>

      {/* Real-time Widgets Section */}
      <div className="mb-8">
        <Title className="text-2xl font-bold text-gray-900 mb-6">Real-time Monitoring</Title>
        
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
          <Col>
            <RealtimeUsersWidget />
          </Col>
          <Col>
            <TotalRevenueWidget 
              totalRevenue={data.totalRevenue} 
              percentageChange={data.percentageChange} 
            />
          </Col>
          <Col>
            <TotalResumesWidget totalResumes={data.totalResumes} />
          </Col>
        </Grid>
      </div>

      {/* Session & User Analysis */}
      <div className="mb-8">
        <Title className="text-2xl font-bold text-gray-900 mb-6">Session & User Analysis</Title>
        
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
          <Col numColSpan={2}>
            <SessionOverviewWidget data={data.sessionData} />
          </Col>
          <Col>
            <UserSegmentationWidget data={data.userSegmentation} />
          </Col>
        </Grid>
      </div>

      {/* System Health */}
      <div className="mb-8">
        <Title className="text-2xl font-bold text-gray-900 mb-6">System Status</Title>
        
        <SystemHealthWidget 
          status={data.systemStatus}
          message={data.systemMessage}
          lastUpdated={data.lastUpdated}
        />
      </div>

      {/* User Engagement & Balance Analysis Section */}
      <div className="mb-8">
        <Title className="text-2xl font-bold text-gray-900 mb-6">User Engagement & Balance Analysis</Title>
        
        <Grid numItemsLg={3} className="gap-6 mb-6">
          {/* Recent Registrations */}
          <Col numColSpanLg={2}>
            <RecentUsersTable users={data.recentUsers} />
          </Col>

          {/* Recent Logins */}
          <Col>
            <RecentLoginsTable logins={data.recentLogins} />
          </Col>
        </Grid>

        {/* User Balance KPIs */}
        <Grid numItemsLg={3} className="gap-6">
          <Col>
            <Card decoration="top" decorationColor="emerald">
              <Flex className="items-start">
                <div className="flex-1">
                  <Text className="text-gray-600">Premium Users</Text>
                  <Metric className="mt-2 text-3xl font-bold text-emerald-600">
                    {data.premiumUsers}
                  </Metric>
                  <Text className="mt-2 text-sm text-gray-500">
                    Balance &gt; 5 Minutes
                  </Text>
                </div>
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
              </Flex>
            </Card>
          </Col>

          <Col>
            <Card decoration="top" decorationColor="blue">
              <Flex className="items-start">
                <div className="flex-1">
                  <Text className="text-gray-600">Unused Trial</Text>
                  <Metric className="mt-2 text-3xl font-bold text-blue-600">
                    {data.unusedTrialUsers}
                  </Metric>
                  <Text className="mt-2 text-sm text-gray-500">
                    Balance = 5 Minutes
                  </Text>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </Flex>
            </Card>
          </Col>

          <Col>
            <Card decoration="top" decorationColor="amber">
              <Flex className="items-start">
                <div className="flex-1">
                  <Text className="text-gray-600">Active Trial</Text>
                  <Metric className="mt-2 text-3xl font-bold text-amber-600">
                    {data.activeTrialUsers}
                  </Metric>
                  <Text className="mt-2 text-sm text-gray-500">
                    Balance &lt; 3 Minutes
                  </Text>
                </div>
                <div className="p-3 bg-amber-100 rounded-lg">
                  <Activity className="h-6 w-6 text-amber-600" />
                </div>
              </Flex>
            </Card>
          </Col>
        </Grid>
      </div>
    </div>
  );
}
