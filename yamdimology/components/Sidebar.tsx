'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Settings, 
  Search,
  ChevronLeft,
  Bell,
  CalendarDays,
  LayoutGrid,
  Package,
  Mail,
  Cable,
  Users,
  CreditCard
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
    { icon: CalendarDays, label: 'Tasks', href: '/tasks' },
    { icon: CalendarDays, label: 'Calendar', href: '/calendar' },
    { icon: LayoutGrid, label: 'Widgets', href: '/widgets' },
  ];

  const marketingItems = [
    { icon: Package, label: 'Product', href: '/product' },
    { icon: Mail, label: 'Emails', href: '/emails' },
    { icon: Cable, label: 'Integration', href: '/integration' },
    { icon: Users, label: 'Contacts', href: '/contacts' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
            Y
          </div>
          <span className="font-semibold text-gray-900">Yamdimology</span>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded">
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute right-3 top-2.5 text-xs text-gray-400">⌘K</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Marketing Section */}
        <div className="mt-6">
          <div className="px-3 mb-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Marketing
            </h3>
          </div>
          <div className="space-y-1">
            {marketingItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Favorite Section */}
        <div className="mt-6">
          <div className="px-3 mb-2 flex items-center space-x-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Favorite
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span>Opportunity Stages</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-teal-500"></div>
              <span>Key Metrics</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <span>Product Plan</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-gray-200">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
