import { Card } from '@tremor/react';
import { getAdminDb } from '@/firebase/adminConfig';
import PaymentsTabs from '@/components/PaymentsTabs';

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

async function getPaymentsData() {
  const db = getAdminDb();

  try {
    // Get all payments
    const paymentsSnapshot = await db.collection('payments').get();
    const allPayments: Payment[] = [];

    paymentsSnapshot.forEach((doc) => {
      const data = doc.data();
      
      // Serialize Firestore Timestamps to plain objects
      const serializeTimestamp = (timestamp: any) => {
        if (!timestamp) return null;
        if (timestamp._seconds) {
          return { _seconds: timestamp._seconds, _nanoseconds: timestamp._nanoseconds };
        }
        return timestamp;
      };

      allPayments.push({
        orderId: doc.id,
        userId: data.userId || '',
        userEmail: data.userEmail || '',
        paymentMethod: data.paymentMethod || '',
        createdAt: serializeTimestamp(data.createdAt),
        completedAt: serializeTimestamp(data.completedAt),
        expiredAt: serializeTimestamp(data.expiredAt),
        status: data.status || '',
        amount: data.amount,
        totalPayment: data.totalPayment,
      });
    });

    // Filter successful payments (status === 'completed')
    const successfulPayments = allPayments.filter(p => p.status === 'completed');

    // Filter pending payments
    const pendingPayments = allPayments.filter(p => p.status === 'pending');

    // Filter expired payments
    const expiredPayments = allPayments.filter(p => p.status === 'expired');

    return {
      successful: successfulPayments,
      pending: pendingPayments,
      expired: expiredPayments,
    };
  } catch (error) {
    console.error('Error fetching payments:', error);
    return {
      successful: [],
      pending: [],
      expired: [],
    };
  }
}

export default async function PaymentsPage() {
  const data = await getPaymentsData();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Analytics</h1>
          <p className="mt-2 text-gray-600">
            Monitor and analyze payment transactions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Successful</p>
            <p className="text-2xl font-bold text-emerald-600">
              {data.successful.length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-amber-600">
              {data.pending.length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Expired</p>
            <p className="text-2xl font-bold text-rose-600">
              {data.expired.length}
            </p>
          </div>
        </div>
      </div>

      {/* Tabbed Payment Tables */}
      <Card>
        <PaymentsTabs 
          successfulPayments={data.successful}
          pendingPayments={data.pending}
          expiredPayments={data.expired}
        />
      </Card>
    </div>
  );
}
