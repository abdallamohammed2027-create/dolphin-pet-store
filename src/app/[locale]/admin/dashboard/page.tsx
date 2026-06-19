'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, Mail, Package, Bell } from 'lucide-react';
import MessagesTab from './MessagesTab';
import SubscribersTab from './SubscribersTab';
import ProductsTab from './ProductsTab';

interface Stats {
  totalMessages: number;
  unreadMessages: number;
  activeSubscribers: number;
  totalProducts: number;
}

type Tab = 'messages' | 'subscribers' | 'products';

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('messages');

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.data);
      });
  }, []);

  const statCards = [
    { label: 'Total Messages', value: stats?.totalMessages, icon: MessageSquare, color: 'text-forest' },
    { label: 'Unread Messages', value: stats?.unreadMessages, icon: Bell, color: 'text-coral' },
    { label: 'Active Subscribers', value: stats?.activeSubscribers, icon: Mail, color: 'text-amber-dark' },
    { label: 'Products', value: stats?.totalProducts, icon: Package, color: 'text-forest' },
  ];

  const tabs: { key: Tab; label: string }[] = [
    { key: 'messages', label: 'Messages' },
    { key: 'subscribers', label: 'Newsletter' },
    { key: 'products', label: 'Products' },
  ];

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-forest/10 bg-white p-5 dark:border-white/10 dark:bg-white/5"
          >
            <card.icon className={`h-6 w-6 ${card.color}`} />
            <p className="mt-3 font-display text-2xl font-bold text-charcoal dark:text-cream">
              {card.value ?? '—'}
            </p>
            <p className="text-xs text-charcoal/60 dark:text-cream/60">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-2 border-b border-forest/10 dark:border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative px-4 py-3 text-sm font-semibold transition-colors ${
              activeTab === tab.key
                ? 'text-forest dark:text-amber-light'
                : 'text-charcoal/50 hover:text-charcoal dark:text-cream/50'
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-forest dark:bg-amber-light" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === 'messages' && <MessagesTab />}
        {activeTab === 'subscribers' && <SubscribersTab />}
        {activeTab === 'products' && <ProductsTab />}
      </div>
    </div>
  );
}
