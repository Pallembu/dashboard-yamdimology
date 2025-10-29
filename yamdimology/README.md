# Yamdimology Analytics Dashboard

A comprehensive web analytics dashboard built with Next.js 14, Firebase, and Tremor UI components.

## 🚀 Technology Stack

- **Next.js**: ^14.2.0 (App Router)
- **React**: ^18.3.0
- **TypeScript**: ^5.4.0
- **Tailwind CSS**: ^3.4.0
- **Tremor**: ^3.17.0 (UI Components)
- **Firebase Client SDK**: ^10.12.0
- **Firebase Admin SDK**: ^12.1.0
- **Lucide React**: ^0.445.0 (Icons)

## 📊 Dashboard Features

### 6 Analytics Widgets

1. **Real-time Users** - Live user count with Firebase `onSnapshot` listener
2. **Session Overview** - Line chart showing 7-day session trends
3. **User Segmentation** - Donut chart for user categorization by device/type
4. **Total Revenue** - KPI card with month-over-month percentage change
5. **System Health** - Status badge showing operational/warning/error states
6. **Total Resumes** - Document count from resumes collection

### Firebase Collections

The dashboard connects to these Firestore collections:
- `analytics_realtime` - Real-time user tracking
- `analytics_sessions` - Session data
- `analytics_users` - User information and segmentation
- `analytics_payments` - Payment analytics
- `analytics_system` - System health monitoring
- `resumes` - Resume documents
- `payments` - Payment records
- `users` - User accounts

## 🛠️ Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

The `.env.local` file is already configured with your Firebase credentials. Make sure it contains:

- Firebase Client SDK credentials (NEXT_PUBLIC_*)
- Firebase Admin SDK credentials (FIREBASE_*)

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
yamdimology/
├── app/
│   ├── layout.tsx              # Root layout with sidebar
│   ├── page.tsx                # Redirects to /dashboard
│   ├── globals.css             # Global styles
│   ├── dashboard/
│   │   └── page.tsx            # Main dashboard (SSR)
│   ├── settings/
│   │   └── page.tsx            # Settings page
│   └── [other routes]/         # Navigation pages
├── components/
│   ├── Sidebar.tsx             # Navigation sidebar
│   └── widgets/
│       ├── RealtimeUsersWidget.tsx
│       ├── SessionOverviewWidget.tsx
│       ├── UserSegmentationWidget.tsx
│       ├── TotalRevenueWidget.tsx
│       ├── SystemHealthWidget.tsx
│       └── TotalResumesWidget.tsx
├── firebase/
│   ├── config.ts               # Client SDK config
│   └── adminConfig.ts          # Admin SDK config (SSR)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎨 Design

The dashboard UI is inspired by the Cusana dashboard reference, featuring:
- Clean, professional layout with Tremor components
- Responsive grid system
- Sidebar navigation with search
- Card-based widget system
- Real-time data updates

## 🔐 Firebase Configuration

### Client SDK (Browser)
Used in client components for real-time listeners (`onSnapshot`)

### Admin SDK (Server)
Used in server components for:
- Initial data fetching (SSR)
- Secure server-side operations
- Aggregation queries

## 📈 Data Flow

1. **Server-Side Rendering**: Dashboard page fetches initial data using Admin SDK
2. **Props Passing**: Data passed to client components as props
3. **Real-time Updates**: RealtimeUsersWidget uses client SDK for live updates
4. **Hybrid Approach**: Best performance + real-time capabilities

## 🚀 Deployment

### Deploy to Vercel

```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables on Vercel

Add all environment variables from `.env.local` to your Vercel project settings.

## 📝 Notes

- The dashboard uses open access (no authentication required)
- All Firestore collections should already contain data
- Real-time widget updates automatically via Firebase listeners
- TypeScript errors during development are normal until dependencies are installed

## 🤝 Support

For issues or questions, please refer to the documentation:
- [Next.js Docs](https://nextjs.org/docs)
- [Tremor Docs](https://www.tremor.so/docs)
- [Firebase Docs](https://firebase.google.com/docs)
