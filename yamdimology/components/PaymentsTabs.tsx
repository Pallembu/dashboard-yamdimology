'use client';

import { TabGroup, TabList, Tab, TabPanels, TabPanel, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Badge, Title, Button } from '@tremor/react';
import { CreditCard, AlertCircle, Clock, XCircle, Eye, Download, RefreshCw } from 'lucide-react';
import { formatDateTime } from '@/lib/dateUtils';

interface Payment {
  orderId: string;
  userId: string;
  userEmail: string;
  paymentMethod: string;
  createdAt: any;
  completedAt?: any;
  expiredAt?: any;
  status: string;
  amount?: number;
  totalPayment?: number;
}

interface PaymentsTabsProps {
  successfulPayments: Payment[];
  pendingPayments: Payment[];
  expiredPayments: Payment[];
}

function formatPaymentMethod(method: string): string {
  if (!method) return 'N/A';
  return method.toUpperCase();
}

export default function PaymentsTabs({ successfulPayments, pendingPayments, expiredPayments }: PaymentsTabsProps) {
  const handleViewDetails = (payment: Payment) => {
    alert(`Payment Details\n\nOrder ID: ${payment.orderId}\nUser: ${payment.userEmail}\nAmount: Rp ${payment.totalPayment?.toLocaleString('id-ID')}\nStatus: ${payment.status}\n\nThis would open a detailed modal with full payment information.`);
  };

  const handleDownloadReceipt = (payment: Payment) => {
    alert(`Downloading receipt for Order ID: ${payment.orderId}\n\nThis would generate and download a PDF receipt.`);
  };

  const handleRefund = (payment: Payment) => {
    if (confirm(`Are you sure you want to refund this payment?\n\nOrder ID: ${payment.orderId}\nAmount: Rp ${payment.totalPayment?.toLocaleString('id-ID')}`)) {
      alert('Refund initiated. This would process the refund through the payment gateway.');
    }
  };

  const handleRetryPayment = (payment: Payment) => {
    if (confirm(`Retry payment for Order ID: ${payment.orderId}?\n\nThis will send a new payment link to ${payment.userEmail}`)) {
      alert('Payment retry initiated. Notification sent to user.');
    }
  };

  return (
    <TabGroup>
      <TabList className="mb-6">
        <Tab icon={CreditCard}>
          Successful ({successfulPayments.length})
        </Tab>
        <Tab icon={Clock}>
          Pending ({pendingPayments.length})
        </Tab>
        <Tab icon={XCircle}>
          Expired ({expiredPayments.length})
        </Tab>
      </TabList>

      <TabPanels>
        {/* Successful Payments Panel */}
        <TabPanel>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Title>Completed Transactions</Title>
              <Badge color="emerald" size="lg">
                {successfulPayments.length} Payments
              </Badge>
            </div>

            {successfulPayments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No successful payments found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>User (Email)</TableHeaderCell>
                      <TableHeaderCell>Payment Method</TableHeaderCell>
                      <TableHeaderCell>Purchase Date</TableHeaderCell>
                      <TableHeaderCell>Paid Date</TableHeaderCell>
                      <TableHeaderCell>Amount</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Actions</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {successfulPayments.map((payment, index) => (
                      <TableRow key={payment.orderId || index}>
                        <TableCell>
                          <div className="font-medium text-gray-900">
                            {payment.userEmail}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge color="blue">
                            {formatPaymentMethod(payment.paymentMethod)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {formatDateTime(payment.createdAt)}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {formatDateTime(payment.completedAt)}
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          {payment.totalPayment 
                            ? `Rp ${payment.totalPayment.toLocaleString('id-ID')}`
                            : 'N/A'
                          }
                        </TableCell>
                        <TableCell>
                          <Badge color="emerald" size="sm">
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="xs"
                              variant="secondary"
                              onClick={() => handleViewDetails(payment)}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button
                              size="xs"
                              variant="secondary"
                              onClick={() => handleDownloadReceipt(payment)}
                            >
                              <Download className="w-3 h-3" />
                            </Button>
                            <Button
                              size="xs"
                              variant="secondary"
                              color="rose"
                              onClick={() => handleRefund(payment)}
                            >
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </TabPanel>

        {/* Pending Payments Panel */}
        <TabPanel>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Title>Pending Transactions</Title>
              <Badge color="amber" size="lg">
                {pendingPayments.length} Payments
              </Badge>
            </div>

            {pendingPayments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No pending payments found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>User ID</TableHeaderCell>
                      <TableHeaderCell>Payment Method</TableHeaderCell>
                      <TableHeaderCell>Purchase Date</TableHeaderCell>
                      <TableHeaderCell>Expiry Date</TableHeaderCell>
                      <TableHeaderCell>Amount</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Actions</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingPayments.map((payment, index) => (
                      <TableRow key={payment.orderId || index}>
                        <TableCell>
                          <div className="font-mono text-sm text-gray-900">
                            {payment.userId || 'N/A'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge color="blue">
                            {formatPaymentMethod(payment.paymentMethod)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {formatDateTime(payment.createdAt)}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {formatDateTime(payment.expiredAt)}
                        </TableCell>
                        <TableCell className="font-semibold text-gray-700">
                          {payment.totalPayment 
                            ? `Rp ${payment.totalPayment.toLocaleString('id-ID')}`
                            : 'N/A'
                          }
                        </TableCell>
                        <TableCell>
                          <Badge color="amber" size="sm">
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="xs"
                              variant="secondary"
                              onClick={() => handleViewDetails(payment)}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button
                              size="xs"
                              variant="secondary"
                              color="amber"
                              onClick={() => handleRetryPayment(payment)}
                            >
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </TabPanel>

        {/* Expired Payments Panel */}
        <TabPanel>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Title>Expired Transactions</Title>
              <Badge color="rose" size="lg">
                {expiredPayments.length} Payments
              </Badge>
            </div>

            {expiredPayments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No expired payments found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>User ID</TableHeaderCell>
                      <TableHeaderCell>Payment Method</TableHeaderCell>
                      <TableHeaderCell>Purchase Date</TableHeaderCell>
                      <TableHeaderCell>Expiry Date</TableHeaderCell>
                      <TableHeaderCell>Amount</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Actions</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {expiredPayments.map((payment, index) => (
                      <TableRow key={payment.orderId || index}>
                        <TableCell>
                          <div className="font-mono text-sm text-gray-900">
                            {payment.userId || 'N/A'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge color="gray">
                            {formatPaymentMethod(payment.paymentMethod)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {formatDateTime(payment.createdAt)}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {formatDateTime(payment.expiredAt)}
                        </TableCell>
                        <TableCell className="font-semibold text-gray-700">
                          {payment.totalPayment 
                            ? `Rp ${payment.totalPayment.toLocaleString('id-ID')}`
                            : 'N/A'
                          }
                        </TableCell>
                        <TableCell>
                          <Badge color="rose" size="sm">
                            Expired
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="xs"
                              variant="secondary"
                              onClick={() => handleViewDetails(payment)}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button
                              size="xs"
                              variant="secondary"
                              color="amber"
                              onClick={() => handleRetryPayment(payment)}
                            >
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
